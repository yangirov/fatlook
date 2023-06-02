import { useCallback, useContext } from 'react';

import { Linking } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../hooks';

import { WebViewContext } from './WebViewModal';

type OpenURLButtonProps = {
    url: string;
    title: string;
};

export const OpenURLButton = ({ url, title }: OpenURLButtonProps) => {
    const webViewContext = useContext(WebViewContext);

    const theme = useAppTheme();

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            webViewContext.show(title, url);
        } else {
            console.error(`Don't know how to open this URL: ${url}`);
        }
    }, [title, url, webViewContext]);

    return (
        <Text style={{ color: theme.colors.primary }} onPress={handlePress}>
            {title}
        </Text>
    );
};
