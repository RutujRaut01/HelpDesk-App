import React from 'react';
import styles from './Users.module.css';

const Users = () => {
    // Mock data for team members
    const users = [
        { id: 1, name: 'Alice Hamilton', role: 'Support Lead', email: 'alice@weanalyze.com', initials: 'AH' },
        { id: 2, name: 'Bob Smith', role: 'Technical Support', email: 'bob@weanalyze.com', initials: 'BS' },
        { id: 3, name: 'Charlie Davis', role: 'Customer Success', email: 'charlie@weanalyze.com', initials: 'CD' },
        { id: 4, name: 'Diana Evans', role: 'Support Agent', email: 'diana@weanalyze.com', initials: 'DE' },
        { id: 5, name: 'Evan Foster', role: 'Technical Support', email: 'evan@weanalyze.com', initials: 'EF' },
        { id: 6, name: 'Fiona Green', role: 'Support Agent', email: 'fiona@weanalyze.com', initials: 'FG' },
    ];

    return (
        <div className={styles.usersContainer}>
            <header className={styles.header}>
                <h1>Team Directory</h1>
                <p>Meet our support team heroes</p>
            </header>

            <div className={styles.usersGrid}>
                {users.map(user => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatar}>{user.initials}</div>
                            <div className={styles.statusIndicator}></div>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userRole}>{user.role}</span>
                            <span className={styles.userEmail}>{user.email}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
