import React from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { EventStatistics } from '../utils/EventStatistics';
import './Charts.css';

/**
 * Charts Component
 * Displays various data visualizations for events
 */
export default function Charts({ events = [] }) {
    if (!events || events.length === 0) {
        return (
            <div className="charts-container empty-state">
                <p>No events data available to display</p>
            </div>
        );
    }

    const stats = new EventStatistics(events);
    const eventsByCity = stats.getEventsByCity();
    const eventsByMonth = stats.getEventsByMonth();
    const eventsByDay = stats.getEventsByDayOfWeek();
    const statistics = stats.getStatistics();

    const COLORS = ['#1f1f1f', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3'];

    return (
        <div className="charts-container">
            <h2>Event Analytics</h2>

            {/* Statistics Summary */}
            <div className="statistics-summary">
                <div className="stat-card">
                    <h3>{statistics.totalEvents}</h3>
                    <p>Total Events</p>
                </div>
                <div className="stat-card">
                    <h3>{statistics.uniqueCities}</h3>
                    <p>Cities</p>
                </div>
                <div className="stat-card">
                    <h3>{statistics.upcomingEvents}</h3>
                    <p>Upcoming</p>
                </div>
                <div className="stat-card">
                    <h3>{statistics.pastEvents}</h3>
                    <p>Past Events</p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
                {/* Events by City Bar Chart */}
                <div className="chart-wrapper">
                    <h3>Events by City</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={eventsByCity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="city" angle={-45} textAnchor="end" height={100} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#4ecdc4" name="Number of Events" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Events by Month Line Chart */}
                <div className="chart-wrapper">
                    <h3>Events Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={eventsByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" angle={-45} textAnchor="end" height={100} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#45b7d1" name="Number of Events" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Events by Day of Week Pie Chart */}
                <div className="chart-wrapper">
                    <h3>Events by Day of Week</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={eventsByDay}
                                dataKey="count"
                                nameKey="day"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {eventsByDay.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
