import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';

const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#269c24',
        surface: '#fff',
        onSurface: '#272727',
        outline: '#e1e1e1',
        background: '#fff',
        tertiary: '#959595',
        lightGray: '#dedede',
        yellow: '#13cb65',
        red: '#f03',
        secondaryContainer: 'rgba(38, 156, 36, 0.2)',
    },
};

const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...lightTheme.colors,
        surface: '#272727',
        onSurface: '#fff',
        background: '#040c19',
        tertiary: '#707070',
    },
};

export type AppTheme = typeof lightTheme;

export const useAppTheme = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? darkTheme : lightTheme;

    return useTheme<AppTheme>(theme);
};
