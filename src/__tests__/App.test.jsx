import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    it('renders the main app container', () => {
        render(<App />);
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('displays the city search component', () => {
        render(<App />);
        const searchInput = screen.getByRole('textbox', { name: /city/i });
        expect(searchInput).toBeInTheDocument();
    });

    it('displays the event list', () => {
        render(<App />);
        expect(screen.getByText(/events/i)).toBeInTheDocument();
    });

    it('filters events by city', async () => {
        render(<App />);
        const searchInput = screen.getByRole('textbox', { name: /city/i });

        await userEvent.type(searchInput, 'Berlin');

        await waitFor(() => {
            const events = screen.getAllByRole('button', { name: /show details/i });
            expect(events.length).toBeGreaterThan(0);
        });
    });

    it('allows user to specify number of events', async () => {
        render(<App />);
        const numberInput = screen.getByRole('spinbutton', { name: /number of events/i });

        await userEvent.clear(numberInput);
        await userEvent.type(numberInput, '5');

        expect(numberInput).toHaveValue(5);
    });

    it('shows and hides event details', async () => {
        render(<App />);

        const showDetailsButtons = screen.getAllByText(/show details/i);
        if (showDetailsButtons.length > 0) {
            await userEvent.click(showDetailsButtons[0]);

            await waitFor(() => {
                const hideButton = screen.getByText(/hide details/i);
                expect(hideButton).toBeInTheDocument();
            });
        }
    });

    it('persists data to localStorage', async () => {
        render(<App />);
        const numberInput = screen.getByRole('spinbutton', { name: /number of events/i });

        await userEvent.clear(numberInput);
        await userEvent.type(numberInput, '10');

        // localStorage should have been updated
        expect(localStorage.getItem('numberOfEvents')).toBe('10');
    });
});
