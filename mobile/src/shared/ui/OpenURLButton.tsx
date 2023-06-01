import { useCallback } from 'react';

import { Linking } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../hooks';

type OpenURLButtonProps = {
    url: string;
    children: string;
};

export const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
    const theme = useAppTheme();

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <Text style={{ color: theme.colors.primary }} onPress={handlePress}>
            {children}
        </Text>
    );
};
