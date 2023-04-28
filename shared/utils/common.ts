export const isEmpty = (obj: unknown) => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
