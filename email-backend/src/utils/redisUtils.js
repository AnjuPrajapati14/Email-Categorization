// src/utils/redisUtils.js

const redis = require("../config/redisConfig");

// Set a key in Redis
async function setKey(key, value) {
  try {
    await redis.set(key, value);
    console.log(`Key set: ${key} => ${value}`);
  } catch (error) {
    console.error("Error setting key:", error);
  }
}

// Get a key from Redis
async function getKey(key) {
  try {
    const value = await redis.get(key);
    console.log(`Key fetched: ${key} => ${value}`);
    return value;
  } catch (error) {
    console.error("Error fetching key:", error);
  }
}

module.exports = { setKey, getKey };
