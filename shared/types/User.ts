export type User = {
    id: string;
    report?: string; // TODO: Remove after migration 4.05.2023
    name: string;
    dailyAmount?: string;
};
