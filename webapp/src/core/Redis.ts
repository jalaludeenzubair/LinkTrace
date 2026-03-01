import redis from 'redis';
let redisClient: redis.RedisClientType;
export const RedisInitializer = () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });
  redisClient.connect();

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });
};

export const setCache = async (key: string, value: string) => {
  try {
    await redisClient.set(key, value, {
      EX: 60,
    });
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export const checkCache = async (key: string): Promise<string | null> => {
  try {
    const value = await redisClient.get(key);
    return typeof value === 'string' ? value : null;
  } catch (err) {
    console.error('Error checking cache:', err);
    return null;
  }
};
