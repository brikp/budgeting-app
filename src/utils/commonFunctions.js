export const filterKeyFromObject = (obj, keyToRemove) => Object.keys(obj)
  .filter((key) => key !== keyToRemove)
  .reduce((res, key) => ({ ...res, [key]: obj[key] }), {});

export const dummy = '';
