# Baseline Threads API Documentation

This API powers the Baseline Threads NBA jersey e-commerce store. It supports endpoints for retrieving player jersey data, store promotions, FAQs, and submitting purchases.

**Base URL:** `http://localhost:8001`

---

## GET /baseline/jerseys

**Description:** Returns all jerseys in the store.

**Method:** `GET`  
**URL:** `/baseline/jerseys`

### Success Response
- **Code:** 200  
- **Content:**
```json
[
  {
    "id": 1,
    "name": "Jayson Tatum",
    "team": "Celtics",
    "price": 99.99,
    "inStock": true,
    "img": "images/tatum.png"
  }
]
```

### Error Response
- **Code:** 500  
- **Content:** `{ "error": "Server error while loading jerseys" }`

### Sample Call
```bash
curl http://localhost:8001/baseline/jerseys
```

---

## GET /baseline/jerseys/player/:name

**Description:** Retrieves a jersey by player name (case-insensitive).

**Method:** `GET`  
**URL:** `/baseline/jerseys/player/:name`

### URL Params
- `:name` (string) — Player name

### Success Response
- **Code:** 200  
- **Content:**
```json
{
  "id": 3,
  "name": "Giannis Antetokounmpo",
  "team": "Bucks",
  "price": 104.99,
  "inStock": true
}
```

### Error Response
- **Code:** 404  
- **Content:** `{ "error": "Player not found" }`

### Sample Call
```bash
curl http://localhost:8001/baseline/jerseys/player/giannis%20antetokounmpo
```

---

## GET /baseline/jerseys/filter

**Description:** Filter jerseys by team, conference, maxPrice, or sort field.

**Method:** `GET`  
**URL:** `/baseline/jerseys/filter`

### Query Params
- `team` (string)
- `conference` (string)
- `maxPrice` (number)
- `sortBy` (string: `price`, `sales`, or `ppg`)

### Success Response
- **Code:** 200  
- **Content:** `[{ ...filtered jersey objects... }]`

### Sample Call
```bash
curl "http://localhost:8001/baseline/jerseys/filter?conference=West&sortBy=ppg"
```

---

## GET /baseline/promotions

**Description:** Returns all active store promotions.

**Method:** `GET`  
**URL:** `/baseline/promotions`

### Success Response
- **Code:** 200  
- **Content:**
```json
[
  {
    "title": "NBA Finals Frenzy",
    "description": "Celebrate the Finals showdown with 20% off all Pacers and Thunder jerseys!",
    "expires": "2025-06-25"
  }
]
```

### Error Response
- **Code:** 500  
- **Content:** `{ "error": "Failed to load promotions" }`

### Sample Call
```bash
curl http://localhost:8001/baseline/promotions
```

---

## GET /baseline/faqs

**Description:** Returns a list of frequently asked questions.

**Method:** `GET`  
**URL:** `/baseline/faqs`

### Success Response
- **Code:** 200  
- **Content:**
```json
[
  {
    "question": "How long does shipping take?",
    "answer": "3-5 business days."
  }
]
```

### Sample Call
```bash
curl http://localhost:8001/baseline/faqs
```

---

## POST /baseline/purchase

**Description:** Marks a jersey as sold (`inStock = false`).

**Method:** `POST`  
**URL:** `/baseline/purchase`

### Body (JSON)
```json
{
  "id": 12
}
```

### Success Response
- **Code:** 200  
- **Content:**
```json
{
  "message": "Purchase successful",
  "jersey": {
    "id": 12,
    "name": "Player Name",
    "inStock": false
  }
}
```

### Error Responses
- **Code:** 400  
  **Content:** `{ "error": "Missing or invalid jersey ID" }`

- **Code:** 404  
  **Content:** `{ "error": "Jersey not found" }`

- **Code:** 400  
  **Content:** `{ "error": "Jersey already sold out" }`

### Sample Call
```bash
curl -X POST http://localhost:8001/baseline/purchase \
  -H "Content-Type: application/json" \
  -d '{"id": 12}'
```

---

## Server Startup

The server runs on port `8001` by default:
```bash
Baseline Threads app.js running at http://localhost:8001
```
