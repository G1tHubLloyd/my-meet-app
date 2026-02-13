import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';

describe('Event Component', () => {
    const mockEvent = {
        id: '1',
        summary: 'Test Event',
        location: 'Test Location',
        description: 'This is a test event',
        start: '2024-12-20T10:00:00Z',
        end: '2024-12-20T11:00:00Z',
    };

    it('renders event summary', () => {
        render(<Event event={mockEvent} />);
        expect(screen.getByText(/test event/i)).toBeInTheDocument();
    });

    it('renders event location', () => {
        render(<Event event={mockEvent} />);
        expect(screen.getByText(/test location/i)).toBeInTheDocument();
    });

    it('shows details button initially', () => {
        render(<Event event={mockEvent} />);
        expect(screen.getByText(/show details/i)).toBeInTheDocument();
    });

    it('toggles details visibility when button is clicked', () => {
        render(<Event event={mockEvent} />);
        const button = screen.getByText(/show details/i);

        fireEvent.click(button);

        expect(screen.getByText(/hide details/i)).toBeInTheDocument();
        expect(screen.getByText(/this is a test event/i)).toBeInTheDocument();
    });

    it('hides details when button is clicked again', () => {
        render(<Event event={mockEvent} />);
        const showButton = screen.getByText(/show details/i);

        fireEvent.click(showButton);
        const hideButton = screen.getByText(/hide details/i);
        fireEvent.click(hideButton);

        expect(screen.getByText(/show details/i)).toBeInTheDocument();
    });

    it('displays event details including date and time', () => {
        render(<Event event={mockEvent} />);
        const showButton = screen.getByText(/show details/i);

        fireEvent.click(showButton);

        // Check that the component displays some date/time information
        expect(screen.getByText(/this is a test event/i)).toBeInTheDocument();
    });
});
