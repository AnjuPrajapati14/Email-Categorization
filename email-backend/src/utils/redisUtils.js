const redis = require("../config/redis");

/**
 * Sets a key-value pair in Redis.
 * @param {string} key - The key to set.
 * @param {string} value - The value to set.
 */
const setKey = async (key, value) => {
  try {
    await redis.set(key, value);
    console.log(`Redis set: ${key} => ${value}`);
  } catch (error) {
    console.error(`Error setting key (${key}):`, error);
  }
};

/**
 * Gets a value by key from Redis.
 * @param {string} key - The key to fetch.
 * @returns {Promise<string>} - The value associated with the key.
 */
const getKey = async (key) => {
  try {
    const value = await redis.get(key);
    console.log(`Redis get: ${key} => ${value}`);
    return value;
  } catch (error) {
    console.error(`Error fetching key (${key}):`, error);
  }
};

/**
 * Deletes a key from Redis.
 * @param {string} key - The key to delete.
 */
const delKey = async (key) => {
  try {
    await redis.del(key);
    console.log(`Redis delete: ${key}`);
  } catch (error) {
    console.error(`Error deleting key (${key}):`, error);
  }
};

module.exports = { setKey, getKey, delKey };
