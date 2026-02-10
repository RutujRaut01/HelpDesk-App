const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Ticket = require('./models/Ticket');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the client app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Auth Dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Auth Routes

// POST Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (isMongoConnected) {
            // Check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } else {
            // In-memory fallback (mock)
            res.status(201).json({ message: 'Registration simulated (In-Memory)' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isMongoConnected) {
            // Find user
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            // Generate Token
            const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } else {
            // In-memory fallback
            if (email === 'demo@weanalyze.com' && password === 'demo123') {
                const token = 'mock-jwt-token-12345';
                res.json({ token, user: { id: 'mock-id', name: 'Demo User', email, role: 'Agent' } });
            } else {
                res.status(400).json({ message: 'Invalid credentials (Try demo@weanalyze.com / demo123)' });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
let isMongoConnected = false;

// In-memory fallback
let localTickets = [
    {
        id: "OPS-101",
        title: "Sample Ticket (Local)",
        description: "This is a local ticket because no database connection was found.",
        status: "To Do",
        priority: "Medium",
        type: "Task",
        assignee: "System",
        created_at: new Date()
    }
];

if (!MONGO_URI) {
    console.log("MONGO_URI not defined. Using in-memory storage.");
} else {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('MongoDB Connected');
            isMongoConnected = true;
        })
        .catch(err => console.error('MongoDB Connection Error:', err));
}

// API Routes

// GET all tickets
app.get('/api/tickets', async (req, res) => {
    try {
        if (isMongoConnected) {
            const tickets = await Ticket.find().sort({ created_at: -1 });
            res.json(tickets);
        } else {
            res.json(localTickets);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ticket by ID
app.get('/api/tickets/:id', async (req, res) => {
    try {
        if (isMongoConnected) {
            const ticket = await Ticket.findOne({ id: req.params.id });
            if (ticket) res.json(ticket);
            else res.status(404).json({ message: 'Ticket not found' });
        } else {
            const ticket = localTickets.find(t => t.id === req.params.id);
            if (ticket) res.json(ticket);
            else res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create ticket
app.post('/api/tickets', async (req, res) => {
    try {
        if (isMongoConnected) {
            const count = await Ticket.countDocuments();
            const newTicket = new Ticket({
                id: `OPS-${1000 + count + 1}`,
                ...req.body
            });
            const savedTicket = await newTicket.save();
            res.status(201).json(savedTicket);
        } else {
            const newTicket = {
                id: `OPS-${localTickets.length + 102}`,
                ...req.body,
                created_at: new Date(),
                status: 'To Do' // ensure default
            };
            localTickets.unshift(newTicket);
            res.status(201).json(newTicket);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update ticket
app.put('/api/tickets/:id', async (req, res) => {
    try {
        if (isMongoConnected) {
            const updatedTicket = await Ticket.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true }
            );
            if (updatedTicket) res.json(updatedTicket);
            else res.status(404).json({ message: 'Ticket not found' });
        } else {
            const index = localTickets.findIndex(t => t.id === req.params.id);
            if (index !== -1) {
                localTickets[index] = { ...localTickets[index], ...req.body };
                res.json(localTickets[index]);
            } else {
                res.status(404).json({ message: 'Ticket not found' });
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST add comment to ticket
app.post('/api/tickets/:id/comments', async (req, res) => {
    try {
        const { text, user } = req.body;
        const comment = { text, user, date: new Date() };

        if (isMongoConnected) {
            const ticket = await Ticket.findOne({ id: req.params.id });
            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

            ticket.comments.push(comment);
            await ticket.save();
            res.json(ticket);
        } else {
            const ticketIndex = localTickets.findIndex(t => t.id === req.params.id);
            if (ticketIndex !== -1) {
                if (!localTickets[ticketIndex].comments) {
                    localTickets[ticketIndex].comments = [];
                }
                localTickets[ticketIndex].comments.push(comment);
                res.json(localTickets[ticketIndex]);
            } else {
                res.status(404).json({ message: 'Ticket not found' });
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        if (isMongoConnected) {
            const total = await Ticket.countDocuments();
            const open = await Ticket.countDocuments({ status: { $ne: 'Done' } });
            const closed = await Ticket.countDocuments({ status: 'Done' });
            const highPriority = await Ticket.countDocuments({ priority: 'High' });

            res.json({ total, open, closed, highPriority });
        } else {
            const total = localTickets.length;
            const open = localTickets.filter(t => t.status !== 'Done').length;
            const closed = localTickets.filter(t => t.status === 'Done').length;
            const highPriority = localTickets.filter(t => t.priority === 'High').length;

            res.json({ total, open, closed, highPriority });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Catch-all handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
