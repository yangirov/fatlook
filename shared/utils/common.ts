import { DEFAULT_CHART_COLORS } from '../colors';

export const isNumeric = (value: unknown): boolean => {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value as string);
};

export const isEmpty = (obj: unknown) => {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEqual = (x: any, y: any) => {
    if (x === y) return true;

    if (!(x instanceof Object) || !(y instanceof Object)) return false;

    if (x.constructor !== y.constructor) return false;

    for (const p in x) {
        if (!x.hasOwnProperty(p)) continue;

        if (!y.hasOwnProperty(p)) return false;

        if (x[p] === y[p]) continue;

        if (typeof x[p] !== 'object') return false;

        if (!isEqual(x[p], y[p])) return false;
    }

    for (const p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;

    return true;
};

export const getPercents = (num: number, total: number, needSymbol = true) => {
    const value = Math.round(((num / total) * 10000) / 100);
    return needSymbol ? `${value}%` : value;
};

export const getColor = (colors?: string[], index?: number) => {
    if (!colors || isEmpty(colors)) {
        colors = DEFAULT_CHART_COLORS;
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (index === undefined) {
        return randomColor;
    }

    return index < colors.length ? colors[index] : randomColor;
};
