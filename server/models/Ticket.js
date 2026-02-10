const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Keeping string ID (e.g., OPS-102) for UI consistency
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'To Do' },
    priority: { type: String, default: 'Medium' },
    assignee: { type: String, default: 'Unassigned' },
    project: { type: String, default: 'Administrative' },
    type: { type: String, default: 'Task' },
    comments: [commentSchema],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
