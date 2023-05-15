export type ObjectWithOptionalKeys<K, V> = Partial<Record<keyof K, V>>;

export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
