import React from 'react';
import { Search, Filter, MoreHorizontal, CheckCircle2, Circle } from 'lucide-react';
import styles from './TicketList.module.css';

const TicketList = ({ tickets, onSelectTicket, selectedTicketId }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <span className={styles.title}>My Tickets</span>
                    <Filter size={16} className={styles.icon} />
                </div>
                <div className={styles.searchRow}>
                    <Search size={16} className={styles.searchIcon} />
                    <input type="text" placeholder="Search tickets" className={styles.searchInput} />
                </div>
            </div>

            <div className={styles.list}>
                {tickets.map(ticket => (
                    <div
                        key={ticket.id}
                        className={`${styles.ticketItem} ${selectedTicketId === ticket.id ? styles.selected : ''}`}
                        onClick={() => onSelectTicket(ticket)}
                    >
                        <div className={styles.ticketHeader}>
                            <span className={styles.ticketTitle}>{ticket.title}</span>
                            <span className={styles.date}>Jun 2</span>
                        </div>
                        <div className={styles.ticketFooter}>
                            <div className={styles.ticketId}>
                                <input type="checkbox" className={styles.checkbox} />
                                <span>{ticket.id}</span>
                            </div>
                            <div className={styles.tags}>
                                <span className={`${styles.statusBadge} ${styles[ticket.status.replace(' ', '').toLowerCase()]}`}>
                                    {ticket.status}
                                </span>
                                <div className={styles.priorityIcon}>
                                    {/* Priority icon placeholder */}
                                    <span className={styles.priorityDot}></span>
                                </div>
                                <div className={styles.avatar}>AH</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketList;
