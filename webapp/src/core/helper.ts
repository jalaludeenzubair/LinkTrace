import NodeCache from 'node-cache';

export const generateUniqueID = () => {
  const unique = Date.now().toString(32);
  const random = Math.random().toString(32).slice(2);
  return unique + random;
};

export const generateShortenUrl = (id: string) => {
  return `${process.env.BASE_URL}/api/link/get/${id}`;
};

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
export const checkCache = (key: string): string => {
  const cachedData: string | undefined = cache.get(key);
  if (cachedData) {
    console.log(`Cache hit for key: ${key}`);
    return cachedData;
  }
  console.log(`Cache miss for key: ${key}`);
};

export const setCache = (key: string, value: string) => {
  cache.set(key, value);
};
