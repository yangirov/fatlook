export type ObjectWithOptionalKeys<K, V> = Partial<Record<keyof K, V>>;
