<!-- # Frontend integration for the existing YatraSense app

The backend is designed around the existing `src/data.js` shape:
- city telemetry: state, liveDensity, densityNote, transit, weather, quietWindow, experience, center
- destinations: id, name, type, category, density, lat, lng, price, description, alternatives
- stays and food are returned by `/api/cities/:name`

## Frontend .env

Create/update the frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart Vite after changing `.env`.

## App.jsx changes

1. Change the React import:

```js
import React, { useEffect, useMemo, useState } from "react";
```

2. Remove:

```js
import { locationData } from "./data";
```

3. Add:

```js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

4. Replace the local `locationData` state usage with API state:

```js
const [locationData, setLocationData] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  let cancelled = false;

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");

      const [citiesResponse, locationsResponse] = await Promise.all([
        fetch(`${API_URL}/cities`),
        fetch(`${API_URL}/locations`)
      ]);

      if (!citiesResponse.ok || !locationsResponse.ok) {
        throw new Error("Could not connect to YatraSense backend.");
      }

      const citiesResult = await citiesResponse.json();
      const locationsResult = await locationsResponse.json();

      const nextData = {};

      for (const city of citiesResult.data) {
        nextData[city.name] = {
          ...city,
          destinations: locationsResult.data
            .filter((location) => location.city === city.name)
            .map(({ city: _city, state: _state, ...location }) => location)
        };
      }

      if (!cancelled) {
        setLocationData(nextData);
      }
    } catch (err) {
      if (!cancelled) setError(err.message || "Failed to load location data.");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  loadInitialData();

  return () => {
    cancelled = true;
  };
}, []);
```

5. Do not render `current.destinations` until the API has loaded. The simplest safe guard is:

```jsx
if (loading) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-sm font-semibold text-slate-600">
        Loading YatraSense locations...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-bold text-red-800">Unable to load location data</p>
        <p className="mt-2 text-sm text-red-700">{error}</p>
        <p className="mt-3 text-xs text-red-600">
          Make sure MongoDB and the YatraSense backend are running.
        </p>
      </div>
    </div>
  );
}
```

The rest of the existing JSX can remain visually unchanged.

## Better city-specific request

If you want the frontend to request only the selected city's destinations, use:

```js
fetch(`${API_URL}/locations?city=${encodeURIComponent(selectedDestination)}`)
```

and:

```js
fetch(`${API_URL}/cities/${encodeURIComponent(selectedDestination)}`)
```

This is optional. The backend already supports it. -->
