// src/routes/redisRoutes.js

const express = require("express");
const redis = require("../config/redisConfig");
const router = express.Router();

const { setKey, getKey, delKey } = require("../utils/redisUtils");

// Route to set a key in Redis
router.post("/set", async (req, res) => {
  const { key, value } = req.body;
  try {
    await redis.set(key, value);
    res.json({ message: `Key ${key} set successfully` });
  } catch (error) {
    console.error("Error setting key:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a key from Redis
router.get("/get/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const value = await redis.get(key);
    res.json({ key, value });
  } catch (error) {
    console.error("Error fetching key:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route to remove a key from Redis
router.delete("/delete/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const result = await redis.del(key); // Delete the key from Redis
    if (result === 1) {
      res.json({ message: `Key '${key}' deleted successfully!` });
    } else {
      res.status(404).json({ error: `Key '${key}' not found.` });
    }
  } catch (error) {
    console.error("Error deleting key:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
