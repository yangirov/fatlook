import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';
import App from './src/App';
import { useAppTheme } from './src/shared/hooks';

export default function Main() {
    const theme = useAppTheme();

    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
