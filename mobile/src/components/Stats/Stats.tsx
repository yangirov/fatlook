import { FC, memo, useEffect, useState } from 'react';

import { HKQuantityTypeIdentifier, HKStatisticsOptions, HKUnit } from '@kingstinct/react-native-healthkit';
import queryStatisticsForQuantity from '@kingstinct/react-native-healthkit/src/utils/queryStatisticsForQuantity';

import { endOfWeek, startOfDay, startOfWeek } from 'date-fns';
import { SafeAreaView, ScrollView, Settings, View } from 'react-native';
import { Card, Divider, ProgressBar, Text } from 'react-native-paper';

import { diffInDays } from '@/core/utils';
import { DEFAULT_GOALS_MAP, Goal, ID_MAP, UNIT_MAP } from '@/mobile/shared/consts';

import { useAppTheme } from '@/mobile/shared/hooks';
import styles from '@/mobile-styles';

const date = new Date();

const TODAY_STATS_TO_SHOW = [
    {
        identifier: HKQuantityTypeIdentifier.bodyMass,
        option: HKStatisticsOptions.discreteAverage,
        title: 'Вес',
        unit: 'kg' as const,
    },
    {
        identifier: HKQuantityTypeIdentifier.stepCount,
        option: HKStatisticsOptions.cumulativeSum,
        title: 'Шаги',
        unit: 'count' as const,
    },
    {
        identifier: HKQuantityTypeIdentifier.dietaryEnergyConsumed,
        option: HKStatisticsOptions.cumulativeSum,
        title: 'Калории',
        unit: 'kcal' as const,
    },
    ...[
        HKQuantityTypeIdentifier.dietaryProtein,
        HKQuantityTypeIdentifier.dietaryCarbohydrates,
        HKQuantityTypeIdentifier.dietaryFiber,
        HKQuantityTypeIdentifier.dietaryFatTotal,
    ].map(identifier => ({
        identifier: identifier,
        option: HKStatisticsOptions.cumulativeSum,
        title: UNIT_MAP[identifier]?.name || '',
        unit: 'g' as const,
    })),
];

const StatsItemComponent: FC<{
    identifier: HKQuantityTypeIdentifier;
    unit: HKUnit;
    title: string;
    option: HKStatisticsOptions;
    startDate?: Date;
    endDate?: Date;
    days?: number;
}> = ({ identifier, option, startDate = startOfDay(date), endDate, unit, title, days }) => {
    const theme = useAppTheme();

    const goal = (Settings.get(ID_MAP[identifier] || '') || DEFAULT_GOALS_MAP[identifier]) as Goal;
    const goalText = goal?.from ? `от ${goal?.from} до ${goal?.to}` : `до ${goal?.to}`;

    const [value, setValue] = useState<string>('Нет данных');
    const [progress, setProgress] = useState<number>();
    const [color, setColor] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const data = await queryStatisticsForQuantity(identifier, [option], startDate, endDate, unit);
            const value = data.sumQuantity || data.mostRecentQuantity || data.averageQuantity;

            if (value) {
                const quantity = days ? value.quantity / days : value.quantity;
                const formatedQuantity = value.unit === 'count' ? Math.floor(quantity) : quantity.toFixed(2);

                const average = `${formatedQuantity} ${UNIT_MAP[identifier]?.unitName}`;
                setValue(average);

                const p = goal.to / quantity;
                setProgress(p);

                if (p > 1) {
                    setColor(theme.colors.red);
                } else if (p < 0.4) {
                    setColor(theme.colors.yellow);
                } else {
                    setColor(theme.colors.primary);
                }
            }
        };

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View>
            <Divider />
            <Text className={styles.statsItem}>
                {title}: {value}
            </Text>
            {progress && (
                <View className={styles.progressBar}>
                    <ProgressBar progress={progress} visible={progress !== undefined} color={color} />
                    <View className={styles.progressBarGoals}>
                        <Text style={{ color: theme.colors.tertiary, fontSize: 12 }}>{goalText}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const StatsItem = memo(StatsItemComponent);

export const Stats: FC = () => {
    return (
        <SafeAreaView>
            <View className={styles.container}>
                <Text className={styles.title}>Статистика</Text>
            </View>

            <ScrollView>
                <View className={styles.container}>
                    <Card mode="outlined" className={styles.card}>
                        <Card.Title title="Сегодня" />
                        <Card.Content>
                            {TODAY_STATS_TO_SHOW.map(e => (
                                <StatsItem
                                    key={e.identifier}
                                    title={e.title}
                                    identifier={e.identifier}
                                    option={e.option}
                                    unit={e.unit}
                                />
                            ))}
                        </Card.Content>
                    </Card>

                    <Card mode="outlined" className={styles.card}>
                        <Card.Title title="Среднее за неделю" />
                        <Card.Content>
                            {TODAY_STATS_TO_SHOW.map(e => (
                                <StatsItem
                                    key={e.identifier}
                                    title={e.title}
                                    identifier={e.identifier}
                                    startDate={startOfWeek(date)}
                                    endDate={endOfWeek(date)}
                                    option={e.option}
                                    unit={e.unit}
                                    days={diffInDays(startOfWeek(date), startOfDay(date))}
                                />
                            ))}
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
