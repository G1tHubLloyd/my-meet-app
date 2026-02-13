import { useState } from 'react';
import './Event.css';

function Event({ event }) {
    // Scenario: An event element is collapsed by default
    const [showDetails, setShowDetails] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleToggleDetails = () => {
        // Scenario: User can expand/collapse event to show/hide details
        setShowDetails(!showDetails);
    };

    return (
        <div className="event">
            <div className="event-header">
                <h3 className="event-summary">{event.summary}</h3>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-time">🕒 {formatDate(event.start)}</p>
            </div>

            {/* Scenario: Show details when expanded */}
            {showDetails && (
                <div className="event-details">
                    <h4>About this event:</h4>
                    <p className="event-description">{event.description}</p>
                    <p className="event-end-time">
                        <strong>Ends:</strong> {formatDate(event.end)}
                    </p>
                </div>
            )}

            <button
                className="details-btn"
                onClick={handleToggleDetails}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
        </div>
    );
}

export default Event;
