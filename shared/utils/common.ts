export const isEmpty = (obj: unknown) => {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
