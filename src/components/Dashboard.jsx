import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [items, setItems] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() => {
        // Load items from localStorage
        const savedItems = JSON.parse(localStorage.getItem(`items_${user?.email}`) || '[]');
        setItems(savedItems);
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleCreateItem = () => {
        navigate('/create-item');
    };

    const handleEditItem = (itemId) => {
        navigate(`/edit-item/${itemId}`);
    };

    const handleDeleteClick = (itemId) => {
        // Scenario: Show delete confirmation
        setShowDeleteConfirm(itemId);
    };

    const handleCancelDelete = () => {
        // Scenario: Cancel deletion - item remains unchanged
        setShowDeleteConfirm(null);
    };

    const handleConfirmDelete = (itemId) => {
        // Scenario: Successful deletion - remove item from list
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        localStorage.setItem(`items_${user?.email}`, JSON.stringify(updatedItems));
        setShowDeleteConfirm(null);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>My Dashboard</h1>
                    <div className="header-actions">
                        <span className="user-email">👤 {user?.email}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-actions">
                    <h2>My Items</h2>
                    <button onClick={handleCreateItem} className="btn-create">
                        + Create New Item
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="empty-state">
                        <p>📦 No items yet</p>
                        <p className="empty-subtitle">
                            Create your first item to get started!
                        </p>
                        <button onClick={handleCreateItem} className="btn-create-empty">
                            Create Item
                        </button>
                    </div>
                ) : (
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item.id} className="item-card">
                                <h3>{item.title}</h3>
                                <p className="item-description">{item.description}</p>
                                <div className="item-meta">
                                    <span className="item-date">
                                        Created: {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="item-actions">
                                    <button
                                        onClick={() => handleEditItem(item.id)}
                                        className="btn-edit"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item.id)}
                                        className="btn-delete"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>

                                {showDeleteConfirm === item.id && (
                                    <div className="delete-confirm">
                                        <p>Are you sure you want to delete this item?</p>
                                        <div className="confirm-actions">
                                            <button
                                                onClick={() => handleConfirmDelete(item.id)}
                                                className="btn-confirm-delete"
                                            >
                                                Yes, Delete
                                            </button>
                                            <button
                                                onClick={handleCancelDelete}
                                                className="btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
