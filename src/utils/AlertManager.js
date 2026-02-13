/**
 * Alert Manager - OOP-based alert system
 * Handles displaying alerts, notifications, and messages to the user
 */

export class AlertManager {
    constructor() {
        this.alerts = [];
        this.alertContainer = null;
        this.setupAlertContainer();
    }

    /**
     * Setup the alert container in the DOM
     */
    setupAlertContainer() {
        let container = document.getElementById('alert-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'alert-container';
            container.className = 'alert-container';
            document.body.insertBefore(container, document.body.firstChild);
        }
        this.alertContainer = container;
    }

    /**
     * Create an alert object
     */
    createAlert(message, type = 'info', duration = 5000) {
        return {
            id: `alert-${Date.now()}-${Math.random()}`,
            message,
            type, // 'success', 'error', 'warning', 'info'
            duration,
            timestamp: new Date(),
        };
    }

    /**
     * Show success alert
     */
    success(message, duration = 5000) {
        return this.show(message, 'success', duration);
    }

    /**
     * Show error alert
     */
    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    /**
     * Show warning alert
     */
    warning(message, duration = 5000) {
        return this.show(message, 'warning', duration);
    }

    /**
     * Show info alert
     */
    info(message, duration = 5000) {
        return this.show(message, 'info', duration);
    }

    /**
     * Main show method
     */
    show(message, type = 'info', duration = 5000) {
        const alert = this.createAlert(message, type, duration);
        this.alerts.push(alert);
        this.renderAlert(alert);

        if (duration > 0) {
            setTimeout(() => this.dismiss(alert.id), duration);
        }

        return alert.id;
    }

    /**
     * Render alert to DOM
     */
    renderAlert(alert) {
        if (!this.alertContainer) return;

        const alertElement = document.createElement('div');
        alertElement.id = alert.id;
        alertElement.className = `alert alert-${alert.type}`;
        alertElement.setAttribute('role', 'alert');
        alertElement.setAttribute('aria-live', alert.type === 'error' ? 'assertive' : 'polite');

        // Create alert content
        const content = document.createElement('div');
        content.className = 'alert-content';

        const messageSpan = document.createElement('span');
        messageSpan.className = 'alert-message';
        messageSpan.textContent = alert.message;
        content.appendChild(messageSpan);

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'alert-close';
        closeButton.setAttribute('aria-label', 'Close alert');
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => this.dismiss(alert.id);

        alertElement.appendChild(content);
        alertElement.appendChild(closeButton);

        this.alertContainer.appendChild(alertElement);

        // Trigger animation
        setTimeout(() => alertElement.classList.add('show'), 10);
    }

    /**
     * Dismiss/remove alert
     */
    dismiss(alertId) {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            alertElement.classList.remove('show');
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.parentNode.removeChild(alertElement);
                }
            }, 300);
        }

        // Remove from alerts array
        this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
    }

    /**
     * Clear all alerts
     */
    clearAll() {
        this.alerts.forEach((alert) => this.dismiss(alert.id));
    }

    /**
     * Get all current alerts
     */
    getAlerts() {
        return [...this.alerts];
    }

    /**
     * Check if there are any alerts
     */
    hasAlerts() {
        return this.alerts.length > 0;
    }
}

// Create singleton instance
export const alertManager = new AlertManager();
