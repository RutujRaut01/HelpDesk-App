const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

// Helper function to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return { tickets: [] };
    }
};

// Helper function to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
};

// GET all tickets
app.get('/api/tickets', (req, res) => {
    const data = readData();
    res.json(data.tickets);
});

// GET ticket by ID
app.get('/api/tickets/:id', (req, res) => {
    const data = readData();
    const ticket = data.tickets.find(t => t.id === req.params.id);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

// POST create ticket
app.post('/api/tickets', (req, res) => {
    const data = readData();
    const newTicket = {
        id: `OPS-${100 + data.tickets.length + 1}`, // Simple ID generation
        ...req.body,
        created_at: new Date().toISOString(),
        status: 'To Do' // Default status
    };
    data.tickets.push(newTicket);
    writeData(data);
    res.status(201).json(newTicket);
});

// PUT update ticket
app.put('/api/tickets/:id', (req, res) => {
    const data = readData();
    const index = data.tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        data.tickets[index] = { ...data.tickets[index], ...req.body };
        writeData(data);
        res.json(data.tickets[index]);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
    writeData({ tickets: [] });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
