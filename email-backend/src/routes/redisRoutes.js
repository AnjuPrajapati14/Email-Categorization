const express = require("express");
const { setKey, getKey, delKey } = require("../utils/redisUtils");

const router = express.Router();

// Route to set a key in Redis
router.post("/set", async (req, res) => {
  const { key, value } = req.body;
  try {
    await setKey(key, value);
    res.json({ success: true, message: `Key '${key}' set successfully` });
  } catch (error) {
    console.error("Error setting key:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route to get a key from Redis
router.get("/get/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const value = await getKey(key);
    if (value) {
      res.json({ success: true, data: { key, value } });
    } else {
      res
        .status(404)
        .json({ success: false, error: `Key '${key}' not found.` });
    }
  } catch (error) {
    console.error("Error fetching key:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route to delete a key from Redis
router.delete("/delete/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const result = await delKey(key);
    if (result === 1) {
      res.json({ success: true, message: `Key '${key}' deleted successfully` });
    } else {
      res
        .status(404)
        .json({ success: false, error: `Key '${key}' not found.` });
    }
  } catch (error) {
    console.error("Error deleting key:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
