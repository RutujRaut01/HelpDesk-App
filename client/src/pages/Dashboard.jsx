import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        closed: 0,
        highPriority: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stats directly from the new API endpoint
        fetch('/api/dashboard/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
                <p>Overview of your helpdesk performance</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statTitle}>Total Tickets</span>
                    <span className={styles.statValue}>{stats.total}</span>
                    <span className={styles.statChange}>+12% from last week</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statTitle}>Open Issues</span>
                    <span className={styles.statValue}>{stats.open}</span>
                    <span className={styles.statChange}>Active now</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statTitle}>Resolved</span>
                    <span className={styles.statValue}>{stats.closed}</span>
                    <span className={`${styles.statChange} ${styles.negative}`}>-5% from last week</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statTitle}>High Priority</span>
                    <span className={styles.statValue}>{stats.highPriority}</span>
                    <span className={`${styles.statChange} ${styles.negative}`}>Needs attention</span>
                </div>
            </div>

            <div className={styles.chartSection}>
                <h3 className={styles.chartTitle}>Ticket Distribution</h3>
                <div className={styles.simpleBarChart}>
                    <div className={styles.barGroup}>
                        <div className={styles.bar} style={{ height: `${(stats.total > 0 ? (stats.open / stats.total) * 100 : 0)}%`, background: '#3b82f6' }}></div>
                        <span className={styles.barLabel}>Open</span>
                    </div>
                    <div className={styles.barGroup}>
                        <div className={styles.bar} style={{ height: `${(stats.total > 0 ? (stats.closed / stats.total) * 100 : 0)}%`, background: '#10b981' }}></div>
                        <span className={styles.barLabel}>Resolved</span>
                    </div>
                    <div className={styles.barGroup}>
                        <div className={styles.bar} style={{ height: `${(stats.total > 0 ? (stats.highPriority / stats.total) * 100 : 0)}%`, background: '#ef4444' }}></div>
                        <span className={styles.barLabel}>High Priority</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
