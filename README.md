# 🏀 Baseline Threads Backend

This is the backend API server for **Baseline Threads**, an interactive NBA jersey e-commerce site where users can explore player stats, apply promotions, and simulate jersey purchases.

🔗 **Frontend (Live Store):** [https://salviyabalami.github.io/baseline-threads](https://salviyabalami.github.io/baseline-threads)  
🔗 **Backend (API):** [https://baseline-threads-backend.onrender.com](https://baseline-threads-backend.onrender.com)

---

## ⚙️ Tech Stack

- **Server:** Node.js + Express
- **Data Source:** Static JSON files (`jerseys`, `promos`, `faqs`)
- **Deployment:** Render
- **CORS:** Enabled for GitHub Pages compatibility

---

## 📁 Endpoints

### `GET /baseline/jerseys`
Returns all player jersey data.

### `GET /baseline/jerseys/player/:name`
Returns a specific jersey object by player name (case-insensitive).

### `GET /baseline/jerseys/filter?conference=West|East`
Filters player jerseys by conference.

### `GET /baseline/jerseys/filter?sortBy=ppg|price|sales`
Returns sorted jersey data based on selected stat.

### `GET /baseline/promotions`
Returns all active jersey promotions.

### `GET /baseline/faqs`
Returns a list of frequently asked questions.

### `POST /baseline/purchase`
Marks a jersey as sold out by updating `inStock` (simulated logic only).

---

## 📂 File Structure

