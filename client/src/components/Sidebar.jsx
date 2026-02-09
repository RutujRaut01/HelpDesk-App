import React from 'react';
import { LayoutDashboard, Ticket, Users, FileText, Settings, HelpCircle, Bell } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>C</div>
                {/* Logo text could go here if design requires, but design shows icon mostly */}
            </div>

            <nav className={styles.nav}>
                <div className={styles.navItem} title="Dashboard">
                    <LayoutDashboard size={20} />
                </div>
                <div className={`${styles.navItem} ${styles.active}`} title="Tickets">
                    <Ticket size={20} />
                </div>
                <div className={styles.navItem} title="Users">
                    <Users size={20} />
                </div>
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
