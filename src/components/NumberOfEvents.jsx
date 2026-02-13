import './NumberOfEvents.css';

function NumberOfEvents({ numberOfEvents, setNumberOfEvents }) {
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Scenario: User can change the number of events displayed
        setNumberOfEvents(value === '' ? '' : parseInt(value));
    };

    return (
        <div className="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events</label>
            <input
                type="number"
                id="number-of-events-input"
                className="number-input"
                value={numberOfEvents}
                onChange={handleInputChange}
                min="1"
                max="100"
                placeholder="32"
            />
        </div>
    );
}

export default NumberOfEvents;
