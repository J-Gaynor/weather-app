# Super Weather

A modern, responsive weather forecast application built with vanilla JavaScript, CSS Grid/Flexbox, and Vite. The app provides a 15-day weather forecast based on either the user's current geolocation or any searched city worldwide.

---

## Technologies Used

### 1. Build Tool & Development Environment
* **Vite**: Modern frontend tooling utilizing native ES modules for instantaneous hot module replacement (HMR) during development and Rollup for production bundling.
* **ESLint (Flat Config)**: Configured via `eslint.config.js` with `@eslint/js` recommended rules and browser globals for code consistency and error prevention.

### 2. Core Language & Architecture
* **Vanilla JavaScript (ES6+)**:
  * **Async / Await & Promises**: Asynchronous data retrieval across multiple third-party services and browser APIs.
  * **Dynamic DOM Manipulation**: Programmatic generation of weather cards, search result dropdowns, and loading states without third-party UI libraries.
  * **Environment Variables**: Managed via Vite's `import.meta.env` with `VITE_` prefixed variables (`.env`).

### 3. APIs & Web Services
* **Visual Crossing Weather API**: Retrieves the 15-day daily forecast (`next14days`), including maximum/minimum temperatures, feels-like temperatures, and condition summaries.
* **Open-Meteo Geocoding API**: Powers the city search functionality, returning matching cities, countries, and coordinate pairs (`latitude`, `longitude`).
* **BigDataCloud Reverse Geocoding API**: Converts raw geographic coordinates from the browser into human-readable city and country names without requiring authentication.
* **Browser Geolocation API**: Utilizes `navigator.geolocation.getCurrentPosition()`, wrapped in a Promise, to detect the user's current location on initial page load.

### 4. Styling & Layout
* **CSS3 Flexbox**: Layout management for the navigation header, search bar, and unit toggle controls.
* **CSS3 Grid**: Powers the two-column display (Today's hero weather card and the 14-day future forecast grid).
* **Viewport Lock (`100vh`)**: Viewport-constrained layout (`overflow: hidden`) preventing window scrolling, with self-contained overflow handling for future forecast cards.
* **CSS Pseudo-Classes**: Uses `:empty` to hide the search results container when inactive without requiring manual DOM style toggling.
* **CSS Keyframe Animations**: Custom animated loading spinner for async operations.

---

## Project Structure

```text
├── index.html           # Main semantic HTML structure
├── vite.config.js       # Vite configuration with relative base path
├── eslint.config.js     # Flat ESLint configuration
├── src/
│   ├── main.js          # DOM rendering, event listeners, unit conversion
│   ├── location.js      # Geolocation, reverse geocoding, and city search
│   ├── weatherApi.js    # Visual Crossing weather API integration
│   └── style.css        # Layout, card styling, and animations
```

---

## Getting Started

### Prerequisites
* Node.js (version 18+ recommended)
* npm

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_API_ENDPOINT=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
   VITE_CITIES_ENDPOINT=https://geocoding-api.open-meteo.com/v1/search?name=
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

