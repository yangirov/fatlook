import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';

import App from './src/App';
import { useAppTheme } from './src/shared/hooks';
import { WebViewContextProvider } from './src/shared/ui';

export default function Main() {
    const theme = useAppTheme();

    return (
        <PaperProvider theme={theme}>
            <WebViewContextProvider>
                <App />
            </WebViewContextProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
