export const localSt = {
  setItem: (key, value) => {
    let data = value;

    if (value instanceof Object) {
      data = JSON.stringify(value);
    }

    localStorage.setItem(key, data);
  },
  getItem: (key) => localStorage.getItem(key),
  removeItem: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
