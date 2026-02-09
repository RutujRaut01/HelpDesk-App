import React from 'react';
import { ChevronDown, MessageCircle, Trello } from 'lucide-react';
import styles from './TicketViews.module.css';

const TicketViews = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>TICKET VIEWS</span>
                <ChevronDown size={14} />
            </div>

            <ul className={styles.menuList}>
                <li className={`${styles.menuItem} ${styles.active}`}>
                    <span>My Tickets</span>
                    <span className={styles.badge}>9</span>
                </li>
                <li className={styles.menuItem}>
                    <span>Past Due</span>
                    <span className={styles.badge}>4</span>
                </li>
                <li className={styles.menuItem}>
                    <span>High Priority</span>
                    <span className={styles.badge}>11</span>
                </li>
                <li className={styles.menuItem}>
                    <span>Unassigned</span>
                    <span className={styles.badge}>98</span>
                </li>
                <li className={styles.menuItem}>
                    <span>All Tickets</span>
                    <span className={styles.badge}>2,192</span>
                </li>
            </ul>

            <div className={styles.divider}></div>

            <div className={styles.otherItem}>
                <MessageCircle size={16} />
                <span>Live Chats</span>
            </div>
            <div className={styles.otherItem}>
                <Trello size={16} />
                <span>Boards</span>
            </div>

        </div>
    );
};

export default TicketViews;
