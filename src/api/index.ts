export function fakeApiFetch<T = unknown>(key: string): Promise<T | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      resolve(data ? (JSON.parse(data) as T) : null);
    }, 2000); // ⏱ 2s delay
  });
}

export function fakeApiSave<T = unknown>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
