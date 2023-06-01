import { AppTheme } from '../hooks';

export const formatDateToISO = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export const getProgressBarValue = (value?: number, min = 0, max?: number, theme?: AppTheme) => {
    if (!value || !max) {
        return undefined;
    }

    let color;

    if (value < min || value > max) {
        return { progress: 0, color };
    }

    const progress = (value - min) / (max - min);

    if (theme) {
        color = theme.colors.primary;

        if (progress > 1) {
            color = theme.colors.red;
        } else if (progress < 0.4) {
            color = theme.colors.yellow;
        }
    }

    return { progress, color };
};
