import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TicketViews from './components/TicketViews';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import CreateTicketModal from './components/CreateTicketModal';
import styles from './App.module.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTickets = () => {
        fetch('http://localhost:5000/api/tickets')
            .then(res => res.json())
            .then(data => {
                setTickets(data);
                if (data.length > 0 && !selectedTicket) {
                    setSelectedTicket(data[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch tickets", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleCreateTicket = (ticketData) => {
        fetch('http://localhost:5000/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to create ticket');
                return res.json();
            })
            .then(newTicket => {
                setTickets([...tickets, newTicket]);
                setIsModalOpen(false);
                setSelectedTicket(newTicket);
            })
            .catch(err => {
                console.error("Error creating ticket", err);
                alert("Failed to create ticket. Check console for details.");
            });
    };

    const handleUpdateStatus = (ticketId, newStatus) => {
        fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update ticket');
                return res.json();
            })
            .then(updatedTicket => {
                setTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t));
                if (selectedTicket?.id === ticketId) {
                    setSelectedTicket(updatedTicket);
                }
            })
            .catch(err => console.error("Error updating ticket", err));
    };

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
    };

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.contentColumn}>
                <Header onCreateClick={() => setIsModalOpen(true)} />
                <div className={styles.workspace}>
                    <TicketViews />
                    <TicketList
                        tickets={tickets}
                        onSelectTicket={handleSelectTicket}
                        selectedTicketId={selectedTicket?.id}
                    />
                    <TicketDetail
                        ticket={selectedTicket}
                        onUpdateStatus={handleUpdateStatus}
                    />
                </div>
            </div>
            {isModalOpen && (
                <CreateTicketModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateTicket}
                />
            )}
        </div>
    );
}

export default App;
