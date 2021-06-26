export const localSt = {
  setItem: (key, value) => {
    let data = value;

    if (value instanceof Object) {
      data = JSON.stringify(value);
    }

    localStorage.setItem(key, data);
  },
  getItem: (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },
  removeItem: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
