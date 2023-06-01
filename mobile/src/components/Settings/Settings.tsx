import { FC, useState } from 'react';

import useHealthkitAuthorization from '@kingstinct/react-native-healthkit/src/hooks/useHealthkitAuthorization';
import { View, SafeAreaView, Settings as Storage, ScrollView, StyleSheet } from 'react-native';

import { Button, Card, List, Switch, Text, TextInput } from 'react-native-paper';

import { FAT_SECRET_USER_ID, GOALS_MAP, Goal, READ_PERMISSIONS } from '@/mobile/shared';
import styles from '@/mobile-styles';

import { FatSecretLink } from '../FatSecretLink';

const GOAL_ITEMS: { id: string; title: string }[] = [
    { id: 'steps', title: 'Количество шагов в день' },
    { id: 'kcal', title: 'Калории в день' },
    { id: 'protein', title: 'Белки в день (г)' },
    { id: 'fiber', title: 'Клетчатка в день (г)' },
];

const SettingsItem: FC<{ id: string; title: string }> = ({ id, title }) => {
    const goal = (Storage.get(id) || GOALS_MAP[id]) as Goal;

    const [isRange, setIsRange] = useState(Boolean(goal?.isRange) || false);
    const [from, setFrom] = useState(goal?.from || null);
    const [to, setTo] = useState(goal.to);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setToStorage = (key: string, value: number | boolean, callback: (value: any) => void) => {
        const currentValue = Storage.get(id);
        Storage.set({ [id]: { ...currentValue, [key]: value } });

        callback(value);
    };

    return (
        <Card mode="outlined" className={styles.card}>
            <Card.Title title={title} />
            <Card.Content>
                <View className={styles.settingsInputs}>
                    {isRange && (
                        <TextInput
                            inputMode="numeric"
                            value={from?.toString()}
                            onChangeText={text => setToStorage('from', Number(text), setFrom)}
                            className={styles.settingsInput}
                            mode="outlined"
                            dense={true}
                            label="От"
                        />
                    )}
                    <TextInput
                        inputMode="numeric"
                        value={to.toString()}
                        onChangeText={text => setToStorage('to', Number(text), setTo)}
                        className={styles.settingsInput}
                        mode="outlined"
                        dense={true}
                        label="До"
                    />
                </View>
                <View className={styles.settingsRange}>
                    <Text>Диапазон</Text>
                    <Switch value={isRange} onValueChange={value => setToStorage('isRange', value, setIsRange)} />
                </View>
            </Card.Content>
        </Card>
    );
};

export const Settings: FC = () => {
    const [userId, setUserId] = useState(() => Storage.get(FAT_SECRET_USER_ID));
    const [, request] = useHealthkitAuthorization(READ_PERMISSIONS);

    const [expandedGoal, setExpandedGoal] = useState(false);
    const [expandedFatSecret, setExpandedFatSecret] = useState(false);

    const onToggleGoal = () => {
        setExpandedGoal(prev => !prev);
        setExpandedFatSecret(false);
    };

    const onToggleFatSecret = () => {
        setExpandedFatSecret(prev => !prev);
        setExpandedGoal(false);
    };

    const resetGoals = () => {
        GOAL_ITEMS.forEach(({ id }) => {
            Storage.set({ [id]: GOALS_MAP[id] });
        });

        onToggleGoal();
    };

    return (
        <SafeAreaView>
            <View className={styles.container}>
                <Text className={styles.title}>Настройки</Text>
            </View>

            <ScrollView>
                <View className={styles.container}>
                    <List.Section>
                        <List.Item
                            style={style.listItem}
                            title="Запросить разрешения"
                            left={() => <List.Icon icon="heart" />}
                            onPress={request}
                        />

                        <List.Accordion
                            style={style.listItem}
                            title="Управление планками"
                            left={() => <List.Icon icon="file-chart-outline" />}
                            expanded={expandedGoal}
                            onPress={onToggleGoal}
                        >
                            {GOAL_ITEMS.map(item => (
                                <SettingsItem key={item.id} {...item} />
                            ))}

                            <Button mode="outlined" style={{ marginBottom: 10 }} onPress={resetGoals}>
                                Сбросить планки
                            </Button>
                        </List.Accordion>

                        <List.Accordion
                            style={style.listItem}
                            title="FatSecret"
                            left={() => <List.Icon icon="eye-circle-outline" />}
                            expanded={expandedFatSecret}
                            onPress={onToggleFatSecret}
                        >
                            <Text className={styles.settingsUserId}>ID: {userId}</Text>
                            <FatSecretLink
                                onSave={() => setUserId(Storage.get(FAT_SECRET_USER_ID))}
                                onClear={() => setUserId('')}
                            />
                        </List.Accordion>
                    </List.Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    listItem: {
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        borderRadius: 8,
    },
});
