import { useState, useEffect } from 'react';
import './CitySearch.css';

function CitySearch({ allLocations, setSelectedCity }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [allLocations]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value === '') {
            setSuggestions(allLocations);
        } else {
            const filteredCities = allLocations.filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredCities);
        }
        setShowSuggestions(true);
    };

    const handleCitySelect = (city) => {
        setQuery(city);
        setShowSuggestions(false);
        setSelectedCity(city);
    };

    const handleViewAll = () => {
        setQuery('');
        setShowSuggestions(false);
        setSelectedCity('all');
    };

    return (
        <div className="city-search">
            <label htmlFor="city-search-input">Search by City</label>
            <input
                type="text"
                id="city-search-input"
                className="city-input"
                placeholder="Search for a city..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                    setSuggestions(allLocations);
                    setShowSuggestions(true);
                }}
                autoComplete="off"
            />

            {showSuggestions && (
                <ul className="suggestions" style={{ display: 'block', visibility: 'visible' }}>
                    <li
                        className="suggestion-item all-cities"
                        onClick={handleViewAll}
                    >
                        <strong>See all cities</strong>
                    </li>
                    {suggestions && suggestions.length > 0 ? (
                        suggestions.map((city, index) => (
                            <li
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleCitySelect(city)}
                            >
                                {city}
                            </li>
                        ))
                    ) : (
                        <li className="suggestion-item">Loading cities...</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default CitySearch;
