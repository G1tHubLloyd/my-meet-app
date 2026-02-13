import { describe, it, expect } from 'vitest';
import { EventStatistics } from '../utils/EventStatistics';

const mockEvents = [
    {
        id: '1',
        summary: 'React Conference',
        location: 'Berlin, Germany',
        start: '2024-12-20T10:00:00Z',
        end: '2024-12-20T11:00:00Z',
    },
    {
        id: '2',
        summary: 'Vue Summit',
        location: 'Berlin, Germany',
        start: '2024-12-21T10:00:00Z',
        end: '2024-12-21T11:00:00Z',
    },
    {
        id: '3',
        summary: 'Angular Conference',
        location: 'London, UK',
        start: '2024-12-22T10:00:00Z',
        end: '2024-12-22T11:00:00Z',
    },
    {
        id: '4',
        summary: 'JS Conference',
        location: 'Paris, France',
        start: '2024-12-23T10:00:00Z',
        end: '2024-12-23T11:00:00Z',
    },
];

describe('EventStatistics', () => {
    it('creates an instance of EventStatistics', () => {
        const stats = new EventStatistics(mockEvents);
        expect(stats).toBeInstanceOf(EventStatistics);
    });

    it('calculates events by city correctly', () => {
        const stats = new EventStatistics(mockEvents);
        const eventsByCity = stats.getEventsByCity();

        expect(eventsByCity).toHaveLength(3);
        expect(eventsByCity[0].city).toBe('Berlin');
        expect(eventsByCity[0].count).toBe(2);
    });

    it('returns events by month', () => {
        const stats = new EventStatistics(mockEvents);
        const eventsByMonth = stats.getEventsByMonth();

        expect(Array.isArray(eventsByMonth)).toBe(true);
        expect(eventsByMonth.length).toBeGreaterThan(0);
    });

    it('returns events by day of week', () => {
        const stats = new EventStatistics(mockEvents);
        const eventsByDay = stats.getEventsByDayOfWeek();

        expect(eventsByDay).toHaveLength(7);
        expect(eventsByDay[0]).toHaveProperty('day');
        expect(eventsByDay[0]).toHaveProperty('count');
    });

    it('calculates statistics correctly', () => {
        const stats = new EventStatistics(mockEvents);
        const statistics = stats.getStatistics();

        expect(statistics.totalEvents).toBe(4);
        expect(statistics.uniqueCities).toBe(3);
    });

    it('handles empty events array', () => {
        const stats = new EventStatistics([]);
        const statistics = stats.getStatistics();

        expect(statistics.totalEvents).toBe(0);
        expect(statistics.uniqueCities).toBe(0);
    });

    it('sorts events by city count in descending order', () => {
        const stats = new EventStatistics(mockEvents);
        const eventsByCity = stats.getEventsByCity();

        for (let i = 0; i < eventsByCity.length - 1; i++) {
            expect(eventsByCity[i].count).toBeGreaterThanOrEqual(eventsByCity[i + 1].count);
        }
    });
});
