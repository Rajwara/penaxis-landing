// localStorage-based stand-in for the Artifacts-only `window.storage` API
// this component was originally built against. Same method shapes
// (get/set/delete/list, each returning {key, value, shared} or null),
// but backed by the browser's own localStorage instead of a real shared
// backend — so "shared" data here only means "shared across tabs on
// this same browser," not across different users or devices. Installed
// once, onto `window.storage`, so the rest of BookVerse's code (which
// calls `window.storage.get(...)` etc. throughout) works unmodified.

function nsKey(key, shared) {
  return `bookverse:${shared ? "shared" : "personal"}:${key}`;
}

function installBookVerseStorage() {
  if (typeof window === "undefined" || window.storage) return;

  window.storage = {
    async get(key, shared = false) {
      try {
        const raw = window.localStorage.getItem(nsKey(key, shared));
        if (raw === null) return null;
        return { key, value: raw, shared };
      } catch {
        return null;
      }
    },
    async set(key, value, shared = false) {
      try {
        window.localStorage.setItem(nsKey(key, shared), value);
        return { key, value, shared };
      } catch {
        return null;
      }
    },
    async delete(key, shared = false) {
      try {
        window.localStorage.removeItem(nsKey(key, shared));
        return { key, deleted: true, shared };
      } catch {
        return null;
      }
    },
    async list(prefix = "", shared = false) {
      try {
        const ns = `bookverse:${shared ? "shared" : "personal"}:`;
        const keys = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const full = window.localStorage.key(i);
          if (full && full.startsWith(ns + prefix)) {
            keys.push(full.slice(ns.length));
          }
        }
        return { keys, prefix, shared };
      } catch {
        return null;
      }
    },
  };
}

export { installBookVerseStorage };
