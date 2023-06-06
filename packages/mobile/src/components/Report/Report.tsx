import { FC, useContext, useState } from 'react';

import { FATLOOK_URL, FAT_SECRET_INSTRUCTIONS } from '@env';
import { SafeAreaView, View, Settings, Linking } from 'react-native';

import { ActivityIndicator, Button, List, Snackbar, Text, TextInput } from 'react-native-paper';

import { ReportData } from '@fatlook/core/types';

import { beautifyDate, formatDate, addDays, isEmpty } from '@fatlook/core/utils';

import { FAT_SECRET_USER_ID } from '@/mobile/shared';
import { useAppTheme } from '@/mobile/shared/hooks';
import { WebViewContext, DismissKeyboardView } from '@/mobile/shared/ui';
import styles from '@/mobile/styles/styles.module.scss';

import { getReportFromHK } from './mapper';

export const Report: FC = () => {
    const webViewContext = useContext(WebViewContext);
    const theme = useAppTheme();

    const date = new Date();
    const [userId] = useState(() => Settings.get(FAT_SECRET_USER_ID));

    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [, setReport] = useState<ReportData>();

    const onDismissSnackBar = () => setVisible(false);

    const sendReport = async () => {
        try {
            setIsLoading(true);

            const data = await getReportFromHK(userId, date);
            setReport(data);

            const url = `${FATLOOK_URL}/api/report?userId=${userId}&date=${formatDate(date)}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!isEmpty(result)) {
                setVisible(true);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const openReportUrl = async (date: Date) => {
        const url = `${FATLOOK_URL}/report/${userId}?&date=${formatDate(date)}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            webViewContext.show(beautifyDate(date), url);
        } else {
            console.log(`Don't know how to open this URL: ${url}`);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView className={styles.loaderOverlay}>
                <ActivityIndicator animating={isLoading} color={theme.colors.primary} size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className={styles.report}>
            <View className={styles.container}>
                <Text className={styles.title}>Отчеты</Text>
            </View>

            <DismissKeyboardView className={styles.container}>
                {/* <TextInput
                    mode="outlined"
                    accessible={false}
                    dense={true}
                    keyboardType="url"
                    label="Ссылка на FatSecret (сегодня)"
                />

                <Text className={styles.hint}>
                    Это необязательное поле. По умолчанию мы забираем данные из Apple Health.{' '}
                    <OpenURLButton url={FAT_SECRET_INSTRUCTIONS} title="Как получить ссылку?" />
                </Text> */}

                <Button mode="contained" onPress={sendReport}>
                    Сдать отчет
                </Button>

                <Text className={styles.subTitle}>Предыдущие отчеты</Text>

                <List.Section>
                    {[...Array(7).keys()].map(index => {
                        const day = addDays(new Date(), index * -1);

                        return (
                            <List.Item
                                style={{ backgroundColor: theme.colors.secondaryContainer }}
                                className={styles.listItem}
                                key={index}
                                title={beautifyDate(day)}
                                onPress={() => openReportUrl(day)}
                            ></List.Item>
                        );
                    })}
                </List.Section>
            </DismissKeyboardView>

            <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={2000}>
                Отчет отправлен!
            </Snackbar>
        </SafeAreaView>
    );
};
