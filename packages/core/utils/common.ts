export const isNumeric = (value: unknown): boolean => {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value as string);
};

export const isEmpty = (obj: unknown) => {
    if (obj === undefined || obj === null) return true;

    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const lowerFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEqual = (x: any, y: any) => {
    if (x === y) {
        return true;
    }

    if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) {
            return false;
        }
        for (let i = 0; i < x.length; i++) {
            if (!isEqual(x[i], y[i])) {
                return false;
            }
        }
        return true;
    }

    if (typeof x === 'object' && typeof y === 'object') {
        const keys1 = Object.keys(x);
        const keys2 = Object.keys(y);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!(key in y) || !isEqual(x[key], y[key])) {
                return false;
            }
        }
        return true;
    }

    return false;
};

export const getPercents = (num: number, total: number, needSymbol = true) => {
    const value = Math.round(((num / total) * 10000) / 100);
    return needSymbol ? `${value}%` : value;
};

export const formatNumber = (num: number, separator = ' ') => {
    const arr = num.toString().split('');

    for (let i = arr.length - 3; i > 0; i -= 3) {
        arr.splice(i, 0, separator);
    }

    return arr.join('');
};
