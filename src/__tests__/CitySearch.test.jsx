import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';

describe('CitySearch Component', () => {
    it('renders the search input', () => {
        render(<CitySearch onCitySelect={() => { }} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('displays suggestions when user focuses on input', async () => {
        render(<CitySearch onCitySelect={() => { }} />);
        const input = screen.getByRole('textbox');

        fireEvent.focus(input);

        await waitFor(() => {
            expect(screen.getByText(/berlin/i)).toBeInTheDocument();
        });
    });

    it('filters suggestions based on user input', async () => {
        render(<CitySearch onCitySelect={() => { }} />);
        const input = screen.getByRole('textbox');

        await userEvent.type(input, 'berlin');

        await waitFor(() => {
            expect(screen.getByText(/berlin, germany/i)).toBeInTheDocument();
        });
    });

    it('calls onCitySelect when user selects a city', async () => {
        const mockOnCitySelect = vi.fn();
        render(<CitySearch onCitySelect={mockOnCitySelect} />);
        const input = screen.getByRole('textbox');

        fireEvent.focus(input);

        await waitFor(() => {
            const suggestion = screen.getByText(/berlin, germany/i);
            fireEvent.click(suggestion);
        });

        expect(mockOnCitySelect).toHaveBeenCalled();
    });

    it('clears input when user selects a city', async () => {
        render(<CitySearch onCitySelect={() => { }} />);
        const input = screen.getByRole('textbox');

        fireEvent.focus(input);

        await waitFor(() => {
            const suggestion = screen.getByText(/berlin, germany/i);
            fireEvent.click(suggestion);
        });

        expect(input.value).toBe('');
    });

    it('hides suggestions when user clicks outside', async () => {
        render(<CitySearch onCitySelect={() => { }} />);
        const input = screen.getByRole('textbox');

        fireEvent.focus(input);

        await waitFor(() => {
            expect(screen.getByText(/berlin/i)).toBeInTheDocument();
        });

        fireEvent.blur(input);

        await waitFor(() => {
            expect(screen.queryByText(/berlin, germany/i)).not.toBeInTheDocument();
        });
    });
});
