export const isEmpty = (obj: unknown) => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
