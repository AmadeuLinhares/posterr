export function replacePathname(path: string) {
  const { origin, pathname, search, hash } = window.location;
  const next = path.startsWith("/") ? path : `/${path}`;
  if (
    `${origin}${next}${search}${hash}` !==
    `${origin}${pathname}${search}${hash}`
  ) {
    window.history.replaceState(null, "", `${next}${search}${hash}`);
  }
}
