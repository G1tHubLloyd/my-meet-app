import Event from './Event';
import './EventList.css';

function EventList({ events }) {
    return (
        <div className="event-list">
            {events && events.length > 0 ? (
                events.map(event => (
                    <Event key={event.id} event={event} />
                ))
            ) : (
                <p className="no-events">No events found</p>
            )}
        </div>
    );
}

export default EventList;
