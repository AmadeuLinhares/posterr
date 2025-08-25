export function fakeApiFetch<T = unknown>(
  key: "posts" | "following" | "user" | "users" | "follow",
): Promise<T | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      resolve(data ? (JSON.parse(data) as T) : null);
    }, 1000); // ⏱ 1s delay
  });
}

export function fakeApiSave<T = unknown>(
  key: "posts" | "following" | "user" | "users" | "follow",
  value: T,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    }, 1000); // ⏱ 1s delay
  });
}
