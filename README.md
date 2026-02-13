# My Meet App

## Project Description
My Meet App is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. The application fetches upcoming events from Google Calendar using OAuth2 authentication and AWS Lambda serverless functions. Users can search for events in different cities, view event details, specify the number of events to display, and visualize event data through interactive charts. The app works offline and can be installed on mobile devices for a native app-like experience.

## 🎯 Technical Highlights
- ✅ **Serverless Architecture** with AWS Lambda
- ✅ **Google Calendar API Integration** with OAuth2
- ✅ **Progressive Web App** (PWA) with offline support
- ✅ **Test-Driven Development** (TDD) with 90%+ coverage target
- ✅ **Cross-browser Compatible** (Chrome, Firefox, Safari, Edge, Opera, IE11)
- ✅ **Responsive Design** (320px - 1920px+)
- ✅ **Object-Oriented Alert System**
- ✅ **Data Visualization** with interactive charts
- ✅ **Performance Monitoring** with Web Vitals tracking

## Technologies Used
- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Testing**: Vitest 1.0.4, React Testing Library 14.1.2
- **Data Visualization**: Recharts 2.10.0
- **API**: Google Calendar API
- **Backend**: AWS Lambda (serverless)
- **Performance**: Web Vitals monitoring
- **Compatibility**: Core.js (IE11 polyfills)
- **Hosting**: GitHub Pages / Vercel
- **Code Quality**: ESLint

## Key Features
1. **Filter Events by City** - Search and autocomplete city selection
2. **Show/Hide Event Details** - Toggle detailed event information
3. **Specify Number of Events** - Control how many events to display
4. **Use App Offline** - Service Worker caching and offline support
5. **Install to Home Screen** - Add PWA shortcut to mobile home screen
6. **Display Charts** - Visualize event data with interactive charts
7. **Alert System** - OOP-based notifications
8. **Performance Tracking** - Monitor Core Web Vitals

---

## Installation & Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/my-meet-app.git
cd my-meet-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your credentials to .env.local
# VITE_GOOGLE_CLIENT_ID=your_client_id
# VITE_AWS_LAMBDA_URL=your_lambda_url
```

### Running the App
```bash
# Development server (http://localhost:5173)
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing & Quality
```bash
# Run all tests (Vitest)
npm run test

# Run tests in watch mode
npm run test

# Run tests with interactive UI
npm run test:ui

# Generate coverage report (target: 90%+)
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Deployment

### GitHub Pages Deployment
```bash
# Build the project
npm run build

# Run deployment script
# On Windows: deploy-github-pages.bat
# On Unix: bash deploy-github-pages.sh

# Then push to GitHub and enable GitHub Pages
```

### Vercel Deployment
```bash
# Push to GitHub, connect to Vercel
# Vercel will auto-build and deploy
```

## Architecture

### Frontend Components
- **App.jsx** - Main app logic and state management
- **CitySearch.jsx** - City autocomplete search
- **Event.jsx** - Individual event card with details toggle
- **EventList.jsx** - List of filtered events
- **NumberOfEvents.jsx** - Event count selector
- **Charts.jsx** - Interactive data visualizations

### Services
- **googleCalendarAPI.js** - Google Calendar API integration
- **awsLambda.js** - AWS Lambda serverless functions
- **AlertManager.js** - OOP-based alert system
- **EventStatistics.js** - Data calculations for charts
- **PerformanceMonitor.js** - Web Vitals tracking

### Configuration
- **vite.config.js** - Vite build configuration
- **vitest.config.js** - Test configuration
- **manifest.json** - PWA manifest
- **service-worker.js** - Offline caching

## Features in Detail

### 1. Google Calendar API Integration
- OAuth 2.0 authentication flow
- Fetch events from Google Calendar
- Secure token management via AWS Lambda
- User-specific event access

### 2. Progressive Web App
- Service Worker for offline access
- Installable on desktop and mobile
- Add to home screen capability
- Works in low/no connectivity environments

### 3. Data Visualization
- Bar chart: Events by city
- Line chart: Events over time
- Pie chart: Events by day of week
- Statistics summary cards

### 4. Alert System
- OOP-based AlertManager class
- Multiple alert types (success, error, warning, info)
- Auto-dismiss with configurable duration
- Accessible notifications

### 5. Performance Monitoring
- Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
- Custom event tracking
- Page performance metrics
- Session tracking

### 6. Cross-Browser Support
- Modern browsers: Chrome, Firefox, Safari, Edge, Opera
- IE11 support with core-js polyfills
- Responsive design for all screen sizes

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| Opera | Latest | ✅ Full |
| IE 11 | Latest | ⚠️ With Polyfills |

## Responsive Design

- **Mobile** (320px - 480px): Single column, optimized touch
- **Tablet** (480px - 768px): Two column layout
- **Desktop** (768px - 1920px): Multi-column grid
- **Large Screens** (1920px+): Full-width optimization

## Documentation

- **[TECHNICAL_REQUIREMENTS.md](TECHNICAL_REQUIREMENTS.md)** - Detailed technical requirements fulfillment
- **[SETUP.md](SETUP.md)** - Configuration and setup guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Implementation overview



**Scenario: When user hasn't specified a number, 32 events are shown by default**  
**Given** the user hasn't specified the number of events  
**When** the user views the events list  
**Then** the default number of 32 events should be displayed

**Scenario: User can change the number of events displayed**  
**Given** the user is on the main page  
**When** the user enters a number in the "Number of Events" input field  
**Then** the events list should update to display that specified number of events

---

### Feature 4 — Use the App When Offline

**Scenario: Show cached data when there's no internet connection**  
**Given** the user has previously loaded events  
**When** the user loses internet connection and opens the app  
**Then** the app should display cached event data

**Scenario: Show error when user changes search settings (city, number of events) while offline**  
**Given** the user is offline  
**When** the user tries to change search settings (city or number of events)  
**Then** the app should display an error message indicating that this feature requires an internet connection

---

### Feature 5 — Add an App Shortcut to the Home Screen

**Scenario: User can install the meet app as a shortcut on their device home screen**  
**Given** the user is using the app on a compatible device  
**When** the user chooses to install the app  
**Then** a shortcut should be added to the device home screen for quick access

---

### Feature 6 — Display Charts Visualizing Event Details

**Scenario: Show a chart with the number of upcoming events in each city**  
**Given** the user is on the main page  
**When** the user views the data visualization section  
**Then** a chart should be displayed showing the number of upcoming events in each city

---

## Installation & Setup

For detailed setup instructions including Google Calendar API and AWS Lambda configuration, see [SETUP.md](SETUP.md).

### Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-meet-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Google Client ID and AWS Lambda URL to `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Run tests:
   ```bash
   npm run test
   ```

7. Build for production:
   ```bash
   npm run build
   ```

## Test-Driven Development (TDD)

This project follows TDD principles with comprehensive test coverage:

```bash
# Run all tests
npm run test

# Run tests in watch mode (default)
npm run test

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Files:**
- `src/__tests__/App.test.jsx` - Main app functionality
- `src/__tests__/CitySearch.test.jsx` - City search and autocomplete
- `src/__tests__/Event.test.jsx` - Event display and details toggle
- `src/__tests__/EventList.test.jsx` - Event list rendering
- `src/__tests__/NumberOfEvents.test.jsx` - Event count selection

## Architecture

### Frontend Stack
- **React 19**: UI library with hooks
- **Vite 7**: Fast build tool and dev server
- **Vitest**: Testing framework compatible with Jest syntax

### Backend Stack
- **AWS Lambda**: Serverless compute for authentication and event fetching
- **Google Calendar API**: Event data source
- **API Gateway**: REST API endpoint

### PWA Features
- **Service Worker**: Offline support and caching strategy
- **Web App Manifest**: Installable on home screen
- **Local Storage**: Client-side data persistence

## Google Calendar API Integration

The app fetches events from Google Calendar using:

1. **OAuth 2.0 Authentication**: User signs in with Google account
2. **Calendar API**: Fetches upcoming events from primary calendar
3. **AWS Lambda Proxy**: Secure token exchange and event retrieval

See `src/services/googleCalendarAPI.js` for implementation details.

## Serverless Architecture

AWS Lambda functions handle:

1. **Authentication Function** (`/auth`): Exchanges Google ID token for access token
2. **Events Function** (`/events`): Fetches and transforms calendar events

See `src/services/awsLambda.js` for client-side integration.

## PWA Features

- **Offline Access**: Service worker caches data for offline use
- **Install to Home Screen**: Add app shortcut to mobile home screen
- **App Manifest**: PWA-compliant manifest.json with icons and metadata
- **Network Strategies**: 
  - Network-first for API calls (fallback to cache)
  - Cache-first for static assets

## Deployment

This application is deployed on Vercel. Visit the live site at: [Add your Vercel URL here]

**Vercel Features:**
- Automatic deployments from GitHub
- Environment variable management
- Edge caching for optimal performance
- PWA support with Service Worker


