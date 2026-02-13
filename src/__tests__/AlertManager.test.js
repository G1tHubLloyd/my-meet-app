import { describe, it, expect, beforeEach } from 'vitest';
import { AlertManager } from '../utils/AlertManager';

describe('AlertManager', () => {
    let alertManager;

    beforeEach(() => {
        // Create fresh instance
        alertManager = new AlertManager();
        // Clean up DOM
        const container = document.getElementById('alert-container');
        if (container) {
            container.innerHTML = '';
        }
    });

    it('creates an instance of AlertManager', () => {
        expect(alertManager).toBeInstanceOf(AlertManager);
    });

    it('shows success alert', () => {
        const alertId = alertManager.success('Test success message');
        expect(alertId).toBeTruthy();
        expect(alertManager.hasAlerts()).toBe(true);
    });

    it('shows error alert', () => {
        const alertId = alertManager.error('Test error message');
        expect(alertId).toBeTruthy();
        expect(alertManager.getAlerts()).toHaveLength(1);
    });

    it('shows warning alert', () => {
        alertManager.warning('Test warning message');
        expect(alertManager.hasAlerts()).toBe(true);
    });

    it('shows info alert', () => {
        alertManager.info('Test info message');
        expect(alertManager.hasAlerts()).toBe(true);
    });

    it('dismisses an alert', () => {
        const alertId = alertManager.success('Test message');
        expect(alertManager.hasAlerts()).toBe(true);

        alertManager.dismiss(alertId);
        expect(alertManager.hasAlerts()).toBe(false);
    });

    it('clears all alerts', () => {
        alertManager.success('Alert 1');
        alertManager.error('Alert 2');
        alertManager.warning('Alert 3');

        expect(alertManager.getAlerts()).toHaveLength(3);

        alertManager.clearAll();
        expect(alertManager.hasAlerts()).toBe(false);
    });

    it('creates alert with correct type', () => {
        const alert = alertManager.createAlert('Test', 'success', 5000);
        expect(alert.type).toBe('success');
        expect(alert.message).toBe('Test');
        expect(alert.duration).toBe(5000);
    });

    it('returns alert object with metadata', () => {
        const alert = alertManager.createAlert('Test message', 'info');
        expect(alert).toHaveProperty('id');
        expect(alert).toHaveProperty('message');
        expect(alert).toHaveProperty('type');
        expect(alert).toHaveProperty('duration');
        expect(alert).toHaveProperty('timestamp');
    });
});
