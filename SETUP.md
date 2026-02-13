# Setup and Configuration Guide

## Project Overview
This is a serverless, progressive web application (PWA) built with React using test-driven development (TDD). The application fetches upcoming events from Google Calendar API and allows users to filter and manage them.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Platform account (for Google Calendar API)
- AWS account (for Lambda serverless functions)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables:**
   Edit `.env.local` and add:
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth 2.0 Client ID
   - `VITE_AWS_LAMBDA_URL`: Your AWS Lambda API endpoint

## Development Server

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port if 5173 is in use).

## Testing

Run tests with Vitest:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage
The project includes comprehensive tests for:
- **App Component**: Main app logic, filtering, event display
- **CitySearch Component**: City autocomplete functionality
- **Event Component**: Event details, show/hide functionality
- **EventList Component**: Event list rendering
- **NumberOfEvents Component**: Event count selection

## Google Calendar API Setup

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Google Calendar API**

### Step 2: Create OAuth 2.0 Credentials
1. Go to **Credentials** in the Cloud Console
2. Click **Create Credentials** → **OAuth Client ID**
3. Choose **Web application**
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for local development)
   - `http://localhost:5174` (alternative)
   - Your Vercel deployment URL
5. Copy the **Client ID** and add it to `.env.local`

### Step 3: Implement Google Sign-In
The app uses the Google API Client Library. The `googleCalendarAPI.js` service provides:
- `initializeGoogleAPI(clientId)`: Initialize the API client
- `signInWithGoogle()`: Authenticate user
- `getCalendarEvents(maxResults)`: Fetch events from primary calendar
- `signOutGoogle()`: Sign out user

## AWS Lambda Setup

### Step 1: Create Lambda Functions
Create two Lambda functions:

**1. Auth Function** (`/auth` endpoint)
- Takes Google ID token as input
- Returns Google Calendar API access token
- Uses [Google's OAuth2 library](https://github.com/googleapis/google-auth-library-nodejs) for Node.js

**2. Events Function** (`/events` endpoint)
- Takes access token and max results
- Fetches events from Google Calendar API
- Returns formatted event data

### Step 2: Create API Gateway
1. Create an AWS API Gateway
2. Connect it to your Lambda functions
3. Enable CORS
4. Get the API endpoint URL
5. Add to `.env.local` as `VITE_AWS_LAMBDA_URL`

### Step 3: Deploy to Vercel
The Lambda functions can be deployed as:
- AWS Lambda with API Gateway
- Vercel Serverless Functions
- Any Node.js serverless platform

## PWA Features

### Service Worker
The app includes a service worker that:
- **Caches** static assets for offline access
- **Network-first strategy** for API calls
- **Cache-first strategy** for static files
- Automatically updates when new versions are available

### Web App Manifest
The `manifest.json` includes:
- App name and short name
- Icons (192x192 and 512x512)
- Maskable icons for adaptive display
- Start URL and display mode
- Theme colors
- Screenshots for app stores

### Offline Functionality
Once installed, the app:
- Works offline for previously cached content
- Syncs data when connection is restored
- Displays helpful messages when offline

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add PWA and serverless functionality"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com/)
   - Click **Import Project**
   - Select your GitHub repository
   - Add environment variables
   - Click **Deploy**

3. **Enable PWA:**
   - Your app is automatically PWA-ready
   - Users can install it from the address bar or browser menu

## Project Structure

```
my-meet-app/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Service worker for offline support
├── src/
│   ├── __tests__/             # Test files
│   │   ├── App.test.jsx
│   │   ├── CitySearch.test.jsx
│   │   └── Event.test.jsx
│   ├── services/              # API services
│   │   ├── googleCalendarAPI.js
│   │   └── awsLambda.js
│   ├── components/            # React components
│   │   ├── App.jsx
│   │   ├── CitySearch.jsx
│   │   ├── Event.jsx
│   │   ├── EventList.jsx
│   │   └── NumberOfEvents.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
├── .env.example
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Run ESLint

## Troubleshooting

### Service Worker not registering
- Make sure the app is served over HTTPS in production
- Check browser console for errors
- Clear browser cache and reload

### Google Calendar API not working
- Verify credentials in `.env.local`
- Check that the app URL is added to authorized origins
- Ensure the Calendar API is enabled in Google Cloud Console

### Tests failing
- Run `npm install` to ensure all dependencies are installed
- Check that Vitest is configured correctly in `vitest.config.js`
- Review test files for any environment-specific issues

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Google Calendar API](https://developers.google.com/calendar/api)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vitest Documentation](https://vitest.dev/)
