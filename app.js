/**
 * Name: Salviya Balami
 * CS132 Spring 2025
 * Date: June 14th, 2025
 * 
 * This is the app.js file for Baseline Threads. It handles the backend logic, 
 * including serving static files, retrieving information about the displayed players,
 * gathering information for FAQs, promotions, and processing jersey purchases.
 */

"use strict";

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { globby } = require("globby");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/**
 * Loads all JSON files in /data and returns them as an object.
 * @returns {Promise<Object>} Parsed data from all JSON files.
 */
async function loadAllData() {
    const paths = await globby(["data/*.json"]);
    const result = {};

    for (const filepath of paths) {
        const key = path.basename(filepath, ".json");
        const raw = fs.readFileSync(filepath, "utf-8");
        result[key] = JSON.parse(raw);
    }

    return result;
}

/**
 * GET /baseline/jerseys
 * Returns all jerseys in the store.
 */
app.get("/baseline/jerseys", async (req, res) => {
    try {
        const data = await loadAllData();
        res.json(data.jerseys || []);
    } catch (err) {
        console.error("Error in /baseline/jerseys:", err); // 🛠 check this log
        res.status(500).json({ error: "Server error while loading jerseys" });
    }
});

/**
 * GET /baseline/jerseys/player/:name
 * Returns a jersey by player name (case-insensitive).
 */
app.get("/baseline/jerseys/player/:name", async (req, res) => {
    const paths = await globby(["data/*.json"]);
    const data = await loadAllData();
    const name = req.params.name.toLowerCase();
    const player = (data.jerseys || []).find(j =>
        j.name.toLowerCase() === name
    );
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ error: "Player not found" });
    }
});

/**
 * GET /baseline/jerseys/filter
 * Returns jerseys filtered by team, conference, maxPrice, and sorted if needed.
 */
app.get("/baseline/jerseys/filter", async (req, res) => {
    const { team, conference, maxPrice, sortBy } = req.query;
    const data = await loadAllData();
    let filtered = data.jerseys || [];

    if (team) {
        filtered = filtered.filter(j => j.team.toLowerCase() === team.toLowerCase());
    }

    if (conference) {
        filtered = filtered.filter(j => j.conference.toLowerCase() === conference.toLowerCase());
    }

    if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max)) {
            filtered = filtered.filter(j => j.price <= max);
        }
    }

    if (sortBy) {
        const validSorts = ["price", "sales", "ppg"];
        if (validSorts.includes(sortBy)) {
            filtered.sort((a, b) => {
                if (sortBy === "price") {
                    return a.price - b.price;
                } else {
                    return b[sortBy] - a[sortBy];
                }
            });
        }
    }

    res.json(filtered);
});

/**
 * GET /baseline/promotions
 * Returns active store promotions.
 */
app.get("/baseline/promotions", async (req, res) => {
    const data = await loadAllData();
    res.json(data.promotions || []);
});

/**
 * GET /baseline/faqs
 * Returns a list of frequently asked questions.
 */
app.get("/baseline/faqs", async (req, res) => {
    const data = await loadAllData();
    res.json(data.faqs || []);
});

/**
 * POST /baseline/purchase
 * Marks a jersey as sold by setting inStock to false.
 * @body {number} id - Jersey ID to purchase
 */
app.post("/baseline/purchase", async (req, res) => {
    const { id } = req.body;

    if (typeof id !== "number") {
        return res.status(400).json({ error: "Missing or invalid jersey ID" });
    }

    const filepath = path.join(__dirname, "data/jerseys.json");
    const jerseys = JSON.parse(fs.readFileSync(filepath, "utf-8"));

    const jersey = jerseys.find(j => j.id === id);
    if (!jersey) {
        return res.status(404).json({ error: "Jersey not found" });
    }

    if (!jersey.inStock) {
        return res.status(400).json({ error: "Jersey already sold out" });
    }

    jersey.inStock = false;
    fs.writeFileSync(filepath, JSON.stringify(jerseys, null, 2));
    res.json({ message: "Purchase successful", jersey });
});

/**
 * Starts the Express server.
 */
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Baseline Threads app.js running at http://localhost:${PORT}`);
});
