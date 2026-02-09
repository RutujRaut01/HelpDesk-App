import React, { useState } from 'react';
import {
    MoreHorizontal, Mail, Eye, CheckCircle2, X, ChevronDown,
    Bold, Italic, Underline, Link, Image, Paperclip,
    Smile, Send, Calendar
} from 'lucide-react';
import styles from './TicketDetail.module.css';

const TicketDetail = ({ ticket, onUpdateStatus }) => {
    if (!ticket) {
        return <div className={styles.emptyState}>Select a ticket to view details</div>;
    }

    const handleStatusClick = () => {
        const nextStatus = ticket.status === 'To Do' ? 'In Progress' : ticket.status === 'In Progress' ? 'Done' : 'To Do';
        onUpdateStatus(ticket.id, nextStatus);
    };

    return (
        <div className={styles.container}>
            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.breadcrumb}>
                        <span className={styles.ticketTitle}>{ticket.title}</span>
                        <div className={styles.meta}>
                            <span className={styles.ticketId}>{ticket.id}</span>
                            <span className={styles.separator}>|</span>
                            <span className={styles.created}>Created {new Date(ticket.created_at).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Mail size={18} className={styles.actionIcon} />
                        <div className={styles.watcherCount}>
                            <Eye size={18} className={styles.actionIcon} />
                            <span>2</span>
                        </div>
                        <MoreHorizontal size={18} className={styles.actionIcon} />
                        <div className={styles.avatars}>
                            <div className={styles.avatar}>AH</div>
                            <div className={styles.avatar} style={{ backgroundColor: '#0052cc' }}>DK</div>
                        </div>
                    </div>
                </div>

                {/* Tab/Filter Bar */}
                <div className={styles.tabs}>
                    <span className={`${styles.tab} ${styles.activeTab}`}>Public Reply</span>
                    <span className={styles.tab}>Private Comment</span>
                </div>

                {/* Reply Box */}
                <div className={styles.replyBox}>
                    <div className={styles.replyHeader}>
                        To: <span className={styles.emailTag}>Allison Westervelt &lt;awestervelt@email.com&gt; <X size={12} /></span>
                        <span className={styles.cc}>Cc</span>
                    </div>
                    <textarea className={styles.replyInput} placeholder="Add a reply..."></textarea>
                    <div className={styles.replyFooter}>
                        <div className={styles.editorTools}>
                            <Bold size={16} />
                            <Italic size={16} />
                            <Underline size={16} />
                            <Link size={16} />
                            <Image size={16} />
                            <Paperclip size={16} />
                            <Smile size={16} />
                        </div>
                        <button className={styles.sendButton}><Send size={16} /></button>
                    </div>
                </div>

                {/* Activity Stream */}
                <div className={styles.activityStream}>
                    <div className={styles.activityItem}>
                        <div className={styles.avatar}>AH</div>
                        <div className={styles.activityContent}>
                            <div className={styles.activityHeader}>
                                <span className={styles.author}>Allie Harmon</span>
                                <span className={styles.timestamp}>Feb 9, 2022 10:31 AM</span>
                            </div>
                            <div className={styles.activityBody}>
                                Ex beatae aliquid mollitia. Enim doloremque molestiae voluptatem recusandae.
                                Maxime beatae nostrum ut. Deserunt totam aut nihil quo beatae.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className={styles.propertiesSidebar}>
                <div className={styles.statusHeader}>
                    <button className={styles.statusButton} onClick={handleStatusClick} title="Click to toggle status">
                        {ticket.status} <ChevronDown size={14} />
                    </button>
                    <button className={styles.closeButton}><X size={16} /></button>
                </div>

                <div className={styles.propertyGroup}>
                    <label>Priority</label>
                    <div className={styles.selectInput}>
                        {ticket.priority || 'Medium'} <ChevronDown size={14} />
                    </div>
                </div>

                <div className={styles.propertyGroup}>
                    <label>Assigned To <span className={styles.assignLink}>Assign to me</span></label>
                    <div className={styles.selectInput}>
                        <div className={styles.userValue}>
                            <div className={styles.avatarSmall}>AH</div> {ticket.assignee || 'Unassigned'}
                        </div>
                        <ChevronDown size={14} />
                    </div>
                </div>

                <div className={styles.propertyGroup}>
                    <label>Project</label>
                    <div className={styles.selectInput}>
                        {ticket.project || 'Administrative'} <ChevronDown size={14} />
                    </div>
                </div>

                <div className={styles.propertyGroup}>
                    <label>Ticket Type</label>
                    <div className={styles.selectInput}>
                        {ticket.type || 'Task'} <ChevronDown size={14} />
                    </div>
                </div>

                <div className={styles.propertyGroup}>
                    <label>Due Date</label>
                    <div className={styles.selectInput}>
                        <Calendar size={14} /> mm/dd/yyyy <ChevronDown size={14} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TicketDetail;
