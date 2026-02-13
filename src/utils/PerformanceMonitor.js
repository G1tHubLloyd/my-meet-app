/**
 * Performance Monitoring
 * Tracks Web Vitals and sends to monitoring service
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export class PerformanceMonitor {
    constructor(endpoint = '/api/metrics') {
        this.endpoint = endpoint;
        this.metrics = [];
        this.sessionId = this.generateSessionId();
        this.setupWebVitals();
    }

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Setup Web Vitals tracking
     */
    setupWebVitals() {
        getCLS((metric) => this.recordMetric(metric));
        getFID((metric) => this.recordMetric(metric));
        getFCP((metric) => this.recordMetric(metric));
        getLCP((metric) => this.recordMetric(metric));
        getTTFB((metric) => this.recordMetric(metric));
    }

    /**
     * Record a metric
     */
    recordMetric(metric) {
        const data = {
            sessionId: this.sessionId,
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        };

        this.metrics.push(data);

        // Log to console in development
        if (import.meta.env.DEV) {
            console.log(`[Performance] ${metric.name}:`, metric.value, metric.rating);
        }

        // Send to monitoring endpoint (if available)
        this.sendMetric(data);
    }

    /**
     * Send metric to monitoring service
     */
    async sendMetric(data) {
        // Only send in production
        if (import.meta.env.DEV) return;

        try {
            // Option 1: Send to your own backend
            // await fetch(this.endpoint, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data),
            // });

            // Option 2: Send to Google Analytics
            if (window.gtag) {
                window.gtag('event', 'page_view', {
                    metric_name: data.name,
                    metric_value: data.value,
                    metric_rating: data.rating,
                });
            }

            // Option 3: Send to Sentry or similar error tracking
            // This can be extended based on your monitoring service
        } catch (error) {
            console.error('Failed to send metric:', error);
        }
    }

    /**
     * Get all recorded metrics
     */
    getMetrics() {
        return [...this.metrics];
    }

    /**
     * Get session metrics summary
     */
    getSummary() {
        return {
            sessionId: this.sessionId,
            totalMetrics: this.metrics.length,
            metrics: this.metrics,
            startTime: new Date().toISOString(),
        };
    }

    /**
     * Track custom event
     */
    trackEvent(eventName, eventData = {}) {
        const event = {
            sessionId: this.sessionId,
            eventName,
            eventData,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        };

        // Send custom event
        this.sendMetric({
            ...event,
            type: 'custom_event',
        });

        if (import.meta.env.DEV) {
            console.log(`[Event] ${eventName}:`, eventData);
        }
    }

    /**
     * Track page performance
     */
    trackPagePerformance(pageName) {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const navigation = window.performance.navigation;

            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            const responseTime = timing.responseEnd - timing.requestStart;
            const renderTime = timing.domContentLoadedEventEnd - timing.domLoading;

            const performanceData = {
                sessionId: this.sessionId,
                pageName,
                pageLoadTime,
                responseTime,
                renderTime,
                navigationTiming: {
                    dns: timing.domainLookupEnd - timing.domainLookupStart,
                    tcp: timing.connectEnd - timing.connectStart,
                    request: timing.responseStart - timing.requestStart,
                    response: timing.responseEnd - timing.responseStart,
                    domInteractive: timing.domInteractive - timing.navigationStart,
                    domComplete: timing.domComplete - timing.navigationStart,
                },
                resourceTiming: this.getResourceMetrics(),
                timestamp: new Date().toISOString(),
            };

            this.sendMetric(performanceData);

            if (import.meta.env.DEV) {
                console.table(performanceData);
            }

            return performanceData;
        }
    }

    /**
     * Get resource timing metrics
     */
    getResourceMetrics() {
        if (!window.performance || !window.performance.getEntriesByType) {
            return [];
        }

        return window.performance
            .getEntriesByType('resource')
            .slice(0, 10) // Limit to first 10
            .map((resource) => ({
                name: resource.name.split('/').pop(),
                duration: Math.round(resource.duration),
                size: resource.transferSize || 0,
            }));
    }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-track page performance after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        performanceMonitor.trackPagePerformance('home');
    }, 0);
});
