/**
 * Event Statistics Utility
 * Provides data for visualization charts
 */

export class EventStatistics {
    constructor(events = []) {
        this.events = events;
    }

    /**
     * Get events by city for bar chart
     */
    getEventsByCity() {
        const cityMap = {};

        this.events.forEach((event) => {
            const location = event.location || 'Unknown';
            const city = location.split(',')[0].trim(); // Extract city from "City, Country"

            if (!cityMap[city]) {
                cityMap[city] = 0;
            }
            cityMap[city]++;
        });

        return Object.entries(cityMap)
            .map(([city, count]) => ({
                city,
                count,
            }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Get events by month for line chart
     */
    getEventsByMonth() {
        const monthMap = {};
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        this.events.forEach((event) => {
            const date = new Date(event.start);
            const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;

            if (!monthMap[monthKey]) {
                monthMap[monthKey] = 0;
            }
            monthMap[monthKey]++;
        });

        return Object.entries(monthMap).map(([month, count]) => ({
            month,
            count,
        }));
    }

    /**
     * Get event count statistics
     */
    getStatistics() {
        const totalEvents = this.events.length;
        const cities = new Set(this.events.map((e) => e.location)).size;
        const upcomingEvents = this.events.filter(
            (e) => new Date(e.start) > new Date()
        ).length;

        return {
            totalEvents,
            uniqueCities: cities,
            upcomingEvents,
            pastEvents: totalEvents - upcomingEvents,
        };
    }

    /**
     * Get events by day of week
     */
    getEventsByDayOfWeek() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayMap = {};

        days.forEach((day) => {
            dayMap[day] = 0;
        });

        this.events.forEach((event) => {
            const date = new Date(event.start);
            const dayName = days[date.getDay()];
            dayMap[dayName]++;
        });

        return Object.entries(dayMap).map(([day, count]) => ({
            day,
            count,
        }));
    }
}
