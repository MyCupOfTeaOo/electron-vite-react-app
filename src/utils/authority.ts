import cache from './cache';

export function getToken(): string | undefined {
  return <string>cache.getLocalCache('token');
}

export function setToken(token: string): void {
  return cache.setLocalCache('token', token);
}

export function clearToken(): void {
  cache.deleteLocalCache('token');
}
