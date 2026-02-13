import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ItemForm.css';

function ItemForm() {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = Boolean(itemId);

    useEffect(() => {
        if (isEditMode) {
            // Load existing item for editing
            const items = JSON.parse(localStorage.getItem(`items_${user?.email}`) || '[]');
            const item = items.find(i => i.id === itemId);
            if (item) {
                setFormData({
                    title: item.title,
                    description: item.description
                });
            }
        }
    }, [itemId, isEditMode, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Scenario: Invalid item submission / Invalid edit
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const items = JSON.parse(localStorage.getItem(`items_${user?.email}`) || '[]');

            if (isEditMode) {
                // Scenario: Successful edit - update existing item
                const updatedItems = items.map(item =>
                    item.id === itemId
                        ? {
                            ...item,
                            title: formData.title.trim(),
                            description: formData.description.trim(),
                            updatedAt: new Date().toISOString()
                        }
                        : item
                );
                localStorage.setItem(`items_${user?.email}`, JSON.stringify(updatedItems));
            } else {
                // Scenario: Successful item creation - add to list
                const newItem = {
                    id: Date.now().toString(),
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                items.push(newItem);
                localStorage.setItem(`items_${user?.email}`, JSON.stringify(items));
            }

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            setErrors({ general: 'Failed to save item. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="item-form-container">
            <div className="item-form-card">
                <h2>{isEditMode ? 'Edit Item' : 'Create New Item'}</h2>
                <p className="subtitle">
                    {isEditMode
                        ? 'Update your item information below'
                        : 'Add a new item to your collection'}
                </p>

                <form onSubmit={handleSubmit} className="item-form">
                    {errors.general && (
                        <div className="error-banner">{errors.general}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="title">Item Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? 'error' : ''}
                            placeholder="Enter item title (min. 3 characters)"
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={errors.description ? 'error' : ''}
                            placeholder="Enter item description (min. 10 characters)"
                            rows="6"
                        />
                        {errors.description && (
                            <span className="error-message">{errors.description}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? isEditMode
                                    ? 'Updating...'
                                    : 'Creating...'
                                : isEditMode
                                    ? 'Update Item'
                                    : 'Create Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ItemForm;
