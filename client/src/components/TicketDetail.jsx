import React, { useState } from 'react';
import { Calendar, User, Tag, AlertCircle, MessageSquare, Send } from 'lucide-react';
import { format } from 'date-fns';
import styles from './TicketDetail.module.css';

const TicketDetail = ({ ticket, onUpdateStatus }) => {
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!ticket) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>select_all</div>
                <h3>Select a ticket to view details</h3>
                <p>Choose a ticket from the list to see its information and status.</p>
            </div>
        );
    }

    const priorityColor = {
        'High': '#ef4444',
        'Medium': '#f59e0b',
        'Low': '#10b981'
    };

    const handleStatusChange = (e) => {
        onUpdateStatus(ticket.id, e.target.value);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSubmitting(true);
        try {
            // Get user from localStorage
            const storedUser = localStorage.getItem('user');
            const currentUser = storedUser ? JSON.parse(storedUser) : null;
            const user = currentUser ? currentUser.name : "Anonymous";

            const response = await fetch(`/api/tickets/${ticket.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: commentText, user })
            });

            if (response.ok) {
                const updatedTicket = await response.json();
                // We need to notify parent to update ticket state, or we can just hack it locally for now
                // Ideally onUpdateStatus or a new refresh callback should handle this.
                // For simplicity, we'll reload the page or rely on parent update if we passed a callback.
                // Let's just alert for now or try to update local state if we had it.
                // Currently ticket comes from props, so we need a way to bubble up.
                // We will assume onUpdateStatus triggers a refetch or we need a new prop `onTicketUpdated`
                // functionality limitation: this won't show immediately unless we refetch.
                // Let's reload to be safe and simple for this scope.
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to add comment", error);
        } finally {
            setIsSubmitting(false);
            setCommentText('');
        }
    };

    return (
        <div className={styles.detailContainer}>
            <div className={styles.header}>
                <div className={styles.idBadge}>{ticket.id}</div>
                <div className={styles.actions}>
                    <select
                        className={styles.statusSelect}
                        value={ticket.status}
                        onChange={handleStatusChange}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>

            <h1 className={styles.title}>{ticket.title}</h1>

            <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                    <span className={styles.label}><User size={14} /> Assignee</span>
                    <span className={styles.value}>{ticket.assignee}</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}><Calendar size={14} /> Created</span>
                    <span className={styles.value}>{ticket.created_at ? format(new Date(ticket.created_at), 'MMM dd, yyyy') : 'N/A'}</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}><Tag size={14} /> Type</span>
                    <span className={styles.value}>{ticket.type}</span>
                </div>
                <div className={styles.metaItem}>
                    <span className={styles.label}><AlertCircle size={14} /> Priority</span>
                    <span className={styles.value} style={{ color: priorityColor[ticket.priority] }}>
                        {ticket.priority}
                    </span>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Description</h3>
                <p className={styles.description}>
                    {ticket.description || "No description provided."}
                </p>
            </div>

            <div className={styles.section}>
                <h3><MessageSquare size={16} /> Activity & Comments</h3>

                <div className={styles.commentsList}>
                    {ticket.comments && ticket.comments.length > 0 ? (
                        ticket.comments.map((comment, index) => (
                            <div key={index} className={styles.comment}>
                                <div className={styles.commentHeader}>
                                    <span className={styles.commentUser}>{comment.user}</span>
                                    <span className={styles.commentDate}>
                                        {format(new Date(comment.date), 'MMM dd, HH:mm')}
                                    </span>
                                </div>
                                <p className={styles.commentText}>{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noComments}>No comments yet.</p>
                    )}
                </div>

                <form className={styles.addCommentForm} onSubmit={handleAddComment}>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <button type="submit" disabled={isSubmitting || !commentText.trim()}>
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketDetail;
