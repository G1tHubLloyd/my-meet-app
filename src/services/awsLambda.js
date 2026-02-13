/**
 * AWS Lambda Service
 * Handles communication with serverless backend functions
 */

const API_ENDPOINT = import.meta.env.VITE_AWS_LAMBDA_URL || 'http://localhost:3001';

/**
 * Get access token from AWS Lambda
 * The Lambda function exchanges the Google ID token for a calendar access token
 */
export const getAccessTokenFromLambda = async (idToken) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_token: idToken }),
        });

        if (!response.ok) {
            throw new Error(`Failed to get access token: ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token from Lambda:', error);
        throw error;
    }
};

/**
 * Get events from AWS Lambda
 * The Lambda function handles the Google Calendar API calls
 */
export const getEventsFromLambda = async (accessToken, maxResults = 32) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                maxResults: maxResults,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get events: ${response.statusText}`);
        }

        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error('Error getting events from Lambda:', error);
        throw error;
    }
};

/**
 * Get event details from AWS Lambda
 */
export const getEventDetailsFromLambda = async (accessToken, eventId) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/events/${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get event details: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting event details:', error);
        throw error;
    }
};
