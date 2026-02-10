import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, Users, FileText, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>C</div>
            </div>

            <nav className={styles.nav}>

                <Link to="/tickets" className={`${styles.navItem} ${isActive('/tickets') ? styles.active : ''}`} title="Tickets">
                    <Ticket size={20} />
                </Link>
                <Link to="/users" className={`${styles.navItem} ${isActive('/users') ? styles.active : ''}`} title="Users">
                    <Users size={20} />
                </Link>
                <div className={styles.navItem} title="Reports">
                    <FileText size={20} />
                </div>
                {/* Spacer to push bottom items down */}
                <div className={styles.spacer}></div>

                <div className={styles.navItem} title="Settings">
                    <Settings size={20} />
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
