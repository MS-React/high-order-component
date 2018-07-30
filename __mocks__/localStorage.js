const mock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => store[key] = value.toString(),
    clear: jest.fn(),
    removeItem: jest.fn()
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mock
});