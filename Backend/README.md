# YatraSense Backend

Node.js + Express + MongoDB REST API for the existing YatraSense frontend.

## 1. Install

```bash
npm install
```

## 2. Configure MongoDB

Copy `.env.example` to `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smartsafar
FRONTEND_URL=http://localhost:5173
```

Make sure MongoDB is running.

## 3. Seed the existing frontend data

```bash
npm run seed
```

The seed contains the existing 73 destination records from the frontend plus the Mussoorie and Dehradun telemetry, stays and food data.

## 4. Start the API

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

## Endpoints

- `GET /api/health`
- `GET /api/cities`
- `GET /api/cities/Mussoorie`
- `GET /api/cities/Dehradun`
- `GET /api/locations`
- `GET /api/locations/:id`

### Location filters

Examples:

- `/api/locations?city=Mussoorie`
- `/api/locations?city=Dehradun&category=Nature%20%26%20Scenic%20Spots`
- `/api/locations?city=Mussoorie&type=alternative`
- `/api/locations?city=Mussoorie&maxPrice=500`
- `/api/locations?city=Mussoorie&search=falls`

The response shape is:

```json
{
  "success": true,
  "count": 1,
  "data": []
}
```

## Frontend integration

Set the API base URL in your Vite frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then fetch:

```js
const response = await fetch(`${import.meta.env.VITE_API_URL}/locations?city=Mussoorie`);
const result = await response.json();
```

The backend does not alter any Tailwind classes, layout, map styling, or component visuals.
