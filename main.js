const maxFib = Number(process.argv[2]) || 10;

let fibCache = {};
const fibCacheShared = {};

function fib(n) {
  if (n <= 1) {
    return 1;
  }

  return fib(n - 1) + fib(n - 2);
}

function fibDP(n, useSharedCache = false) {
  if (n <= 1) {
    return 1;
  }

  if (useSharedCache && fibCacheShared[n]) {
    return fibCacheShared[n];
  } else if (fibCache[n]) {
    return fibCache[n];
  }

  const fibValue = fibDP(n - 1, useSharedCache) + fibDP(n - 2, useSharedCache);
  useSharedCache ? (fibCacheShared[n] = fibValue) : (fibCache[n] = fibValue);
  return fibValue;
}

function FibTime(n, regTime, cacheTime, sharedCacheTime) {
  this.n = n;
  this.regTime = regTime;
  this.cacheTime = cacheTime;
  this.sharedCacheTime = sharedCacheTime;
}

console.log(`Profiling fibonacci calculation (n=0,..,${maxFib})`);
for (let i = 0; i <= maxFib; i++) {
  const start = Date.now();
  fib(i);
  const regTime = Date.now() - start;

  const startCache = Date.now();
  fibCache = {};
  fibDP(i);
  const cacheTime = Date.now() - startCache;

  const startSharedCache = Date.now();
  fibDP(i, true);
  const sharedCacheTime = Date.now() - startSharedCache;

  console.log(new FibTime(i, regTime, cacheTime, sharedCacheTime));
}
