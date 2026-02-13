/**
 * Google Calendar API Service
 * Handles authentication and fetching events from Google Calendar
 */

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Initialize the Google API client
export const initializeGoogleAPI = (clientId) => {
    return new Promise((resolve, reject) => {
        window.gapi.load('client:auth2', async () => {
            try {
                await window.gapi.client.init({
                    clientId: clientId,
                    scope: SCOPES.join(' '),
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
};

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const auth = window.gapi.auth2.getAuthInstance();
        const user = await auth.signIn();
        return user;
    } catch (error) {
        console.error('Sign-in failed:', error);
        throw error;
    }
};

// Sign out
export const signOutGoogle = async () => {
    try {
        const auth = window.gapi.auth2.getAuthInstance();
        await auth.signOut();
    } catch (error) {
        console.error('Sign-out failed:', error);
        throw error;
    }
};

// Get events from Google Calendar
export const getCalendarEvents = async (maxResults = 32) => {
    try {
        const response = await window.gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: maxResults,
            orderBy: 'startTime',
        });

        const events = response.result.items || [];

        // Transform Google Calendar events to our format
        return events.map((event) => ({
            id: event.id,
            summary: event.summary,
            location: event.location || 'Location not specified',
            description: event.description || '',
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
            htmlLink: event.htmlLink,
            hangoutLink: event.hangoutLink,
        }));
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
};

// Get access token
export const getAccessToken = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    return auth.currentUser.get().getAuthResponse().id_token;
};

// Check if user is signed in
export const isUserSignedIn = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    return auth.isSignedIn.get();
};
