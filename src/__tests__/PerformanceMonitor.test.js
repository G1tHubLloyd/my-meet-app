import { describe, it, expect } from 'vitest';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';

describe('PerformanceMonitor', () => {
    it('creates an instance of PerformanceMonitor', () => {
        const monitor = new PerformanceMonitor();
        expect(monitor).toBeInstanceOf(PerformanceMonitor);
    });

    it('generates unique session ID', () => {
        const monitor1 = new PerformanceMonitor();
        const monitor2 = new PerformanceMonitor();

        expect(monitor1.sessionId).not.toBe(monitor2.sessionId);
    });

    it('records custom events', () => {
        const monitor = new PerformanceMonitor();
        monitor.trackEvent('test_event', { testData: 'value' });

        expect(monitor.getMetrics().length).toBeGreaterThan(0);
    });

    it('returns metrics summary', () => {
        const monitor = new PerformanceMonitor();
        const summary = monitor.getSummary();

        expect(summary).toHaveProperty('sessionId');
        expect(summary).toHaveProperty('totalMetrics');
        expect(summary).toHaveProperty('metrics');
        expect(summary).toHaveProperty('startTime');
    });

    it('tracks page performance', () => {
        const monitor = new PerformanceMonitor();
        const perfData = monitor.trackPagePerformance('test_page');

        if (perfData) {
            expect(perfData).toHaveProperty('sessionId');
            expect(perfData).toHaveProperty('pageName');
        }
    });

    it('gets all recorded metrics', () => {
        const monitor = new PerformanceMonitor();
        monitor.trackEvent('event1');
        monitor.trackEvent('event2');

        const metrics = monitor.getMetrics();
        expect(Array.isArray(metrics)).toBe(true);
    });

    it('provides metric session context', () => {
        const monitor = new PerformanceMonitor();
        expect(monitor.sessionId).toBeTruthy();
        expect(typeof monitor.sessionId).toBe('string');
    });
});
