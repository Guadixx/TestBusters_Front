const useLocalStorage = (mode, key, value) => {
  return mode == 'get'
    ? localStorage.getItem(key)
    : mode == 'set'
    ? localStorage.setItem(key, value)
    : localStorage.removeItem(key);
};
export default useLocalStorage;
