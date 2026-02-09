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

// Catch-all handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
