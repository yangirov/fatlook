import React, { useEffect, useState } from 'react';

import Healthkit, { HKAuthorizationRequestStatus } from '@kingstinct/react-native-healthkit';
import useHealthkitAuthorization from '@kingstinct/react-native-healthkit/src/hooks/useHealthkitAuthorization';

import { BottomNavigation } from 'react-native-paper';

import { READ_PERMISSIONS } from '@/mobile/shared';
import { useAppTheme } from '@/mobile/shared/hooks';

import { Report } from './components/Report/Report';
import { Settings } from './components/Settings';
import { Stats } from './components/Stats';
import { Welcome } from './components/Welcome';

function App(): JSX.Element {
    const theme = useAppTheme();
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'stats', title: 'Статитика', focusedIcon: 'chart-bar' },
        { key: 'report', title: 'Отчеты', focusedIcon: 'note-plus' },
        { key: 'settings', title: 'Настройки', focusedIcon: 'cog' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        stats: Stats,
        report: Report,
        settings: Settings,
    });

    const [status, request] = useHealthkitAuthorization(READ_PERMISSIONS);

    const [, setAccessProtectedData] = useState<boolean>(false);

    useEffect(() => {
        Healthkit.canAccessProtectedData()
            .then(setAccessProtectedData)
            .catch(() => setAccessProtectedData(false));
    }, []);

    if (status !== HKAuthorizationRequestStatus.unnecessary) {
        return <Welcome request={request} />;
    }

    return (
        <BottomNavigation
            barStyle={{ backgroundColor: theme.colors.background }}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.tertiary}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

export default App;
