type CacheItem = {
  value: string;
  expires: number;
};

const cache = new Map<string, CacheItem>();

export function getCachedValue(key: string) {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() > item.expires) {
    cache.delete(key);
    return null;
  }

  return item.value;
}

export function setCachedValue(
  key: string,
  value: string,
  ttl = 1000 * 60 * 10 // 10 minutes
) {
  cache.set(key, {
    value,
    expires: Date.now() + ttl,
  });
}

export function clearCache() {
  cache.clear();
}