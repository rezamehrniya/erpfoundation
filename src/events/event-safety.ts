const DANGEROUS_KEYS = new Set([
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'apiKey',
  'secret',
  'privateKey',
  'authorization',
  'cookie',
  'setCookie'
]);

export const hasUnsafeEventPayloadKeys = (payload: Record<string, unknown>): boolean => {
  for (const key of Object.keys(payload)) {
    if (DANGEROUS_KEYS.has(key)) {
      return true;
    }
  }
  return false;
};
