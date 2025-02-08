const redis = require("./redis");

const setCache = async (key, value, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (err) {
    console.error("Error setting cache:", err);
  }
};

const getCache = async (key) => {
  try {
    const cachedValue = await redis.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  } catch (err) {
    console.error("Error getting cache:", err);
    return null;
  }
};

module.exports = { setCache, getCache };
