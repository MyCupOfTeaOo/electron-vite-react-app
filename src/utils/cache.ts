import { prefix } from '#/projectConfig';

export default {
  set(key: string, value: {} | string | number): void {
    sessionStorage.setItem(`${prefix || ''}_${key}`, JSON.stringify(value));
  },
  get(key: string): {} | string | number | undefined {
    const value = sessionStorage.getItem(`${prefix || ''}_${key}`);
    try {
      if (value) return JSON.parse(value);
    } catch (err) {
      this.delete(`${prefix || ''}_${key}`);
      console.error(err, `${key}数据解析失败,删除`);
    }
    return undefined;
  },
  delete(key: string): void {
    sessionStorage.removeItem(key);
  },
  setLocalCache(key: string, value: {} | string | number): void {
    localStorage.setItem(`${prefix || ''}_${key}`, JSON.stringify(value));
  },
  getLocalCache<T>(key: string): T | undefined {
    const value = localStorage.getItem(`${prefix || ''}_${key}`);
    try {
      if (value) return JSON.parse(value);
    } catch (err) {
      this.deleteLocalCache(key);
      console.error(err, `${key}数据解析失败,删除`);
    }
    return undefined;
  },
  deleteLocalCache(key: string): void {
    localStorage.removeItem(`${prefix}_${key}`);
  },
};
