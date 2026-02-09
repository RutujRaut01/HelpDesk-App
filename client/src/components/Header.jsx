import React from 'react';
import { Search, Plus, HelpCircle, Gift } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ onCreateClick }) => {
    return (
        <div className={styles.header}>
            <div className={styles.leftSection}>
                <span className={styles.appName}>Helpdesk</span>
                <div className={styles.searchContainer}>
                    <Search size={16} className={styles.searchIcon} />
                    <input type="text" placeholder="Search Capacity..." className={styles.searchInput} />
                </div>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.createButton} onClick={onCreateClick}>
                    Create <Plus size={16} />
                </button>
                <div className={styles.iconButton}><HelpCircle size={20} /></div>
                <div className={styles.iconButton}><Gift size={20} /></div>
                <div className={styles.avatar}>AH</div>
            </div>
        </div>
    );
};

export default Header;
