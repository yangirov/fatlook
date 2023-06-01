import { FC, useContext, useState } from 'react';

import { FATLOOK_URL } from '@env';
import { addDays } from 'date-fns';
import { SafeAreaView, View, Settings, Linking } from 'react-native';

import { Button, List, Text, TextInput } from 'react-native-paper';

import { ReportData } from '@/core/types';

import { beautifyDate, formatDate } from '@/core/utils';
import { FAT_SECRET_USER_ID } from '@/mobile/shared';
import { useAppTheme } from '@/mobile/shared/hooks';
import { WebViewContext } from '@/mobile/shared/ui';
import styles from '@/mobile/styles/styles.module.scss';

import { getReportFromHK } from './mapper';

export const Report: FC = () => {
    const webViewContext = useContext(WebViewContext);
    const theme = useAppTheme();

    const date = new Date();
    const [userId] = useState(() => Settings.get(FAT_SECRET_USER_ID));

    const [, setReport] = useState<ReportData>();

    const getData = async () => {
        const data = await getReportFromHK(userId, date);
        setReport(data);
    };

    const openReportUrl = async (date: Date) => {
        const url = `${FATLOOK_URL}/report/${userId}?&date=${formatDate(date)}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            webViewContext.show(`Отчет ${beautifyDate(date)}`, url);
        } else {
            console.error(`Don't know how to open this URL: ${url}`);
        }
    };

    return (
        <SafeAreaView>
            <View className={styles.container}>
                <Text className={styles.title}>Отчеты</Text>
            </View>

            <View className={styles.container}>
                <TextInput mode="outlined" dense={true} label="Ссылка на FatSecret (сегодня)" />

                <Text className={styles.hint}>
                    Это необязательное поле. По умолчанию мы забираем данные из Apple Health.
                </Text>

                <Button mode="contained" onPress={getData}>
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
            </View>
        </SafeAreaView>
    );
};
