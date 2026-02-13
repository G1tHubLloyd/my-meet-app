import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import mockEvents from './mock-data';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  // Scenario: When user hasn't specified a number, 32 events are shown by default
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  useEffect(() => {
    // Extract unique locations from events
    const locations = [...new Set(mockEvents.map(event => event.location))];
    setAllLocations(locations);
    setEvents(mockEvents);
  }, []);

  useEffect(() => {
    // Filter events based on selected city and number
    let filteredEvents = mockEvents;

    // Scenario: Filter events by city
    if (selectedCity && selectedCity !== 'all') {
      filteredEvents = mockEvents.filter(
        event => event.location === selectedCity
      );
    }

    // Scenario: Limit to specified number of events
    if (numberOfEvents) {
      filteredEvents = filteredEvents.slice(0, numberOfEvents);
    }

    setEvents(filteredEvents);
  }, [selectedCity, numberOfEvents]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Meet App</h1>
        <p className="app-subtitle">Discover tech events in cities around the world</p>
      </header>

      <main className="app-main">
        <div className="controls">
          <CitySearch
            allLocations={allLocations}
            setSelectedCity={setSelectedCity}
          />
          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            setNumberOfEvents={setNumberOfEvents}
          />
        </div>

        <EventList events={events} />
      </main>

      <footer className="app-footer">
        <p>Built with React & Vite | CareerFoundry Full-Stack Project</p>
      </footer>
    </div>
  );
}

export default App;
