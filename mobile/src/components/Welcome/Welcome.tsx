import { FC, useState } from 'react';

import { HKAuthorizationRequestStatus } from '@kingstinct/react-native-healthkit';
import { View, Image, Platform, SafeAreaView } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';

import styles from '@/mobile-styles';

import { FatSecretLink } from '../FatSecretLink';

type WelcomeProps = {
    request: () => Promise<HKAuthorizationRequestStatus>;
};

export const Welcome: FC<WelcomeProps> = ({ request }) => {
    const [step, setStep] = useState(0);

    const incrementStep = () => setStep(prev => prev + 1);
    const decrementStep = () => setStep(prev => prev - 1);

    return (
        <>
            <Appbar.Header>
                {step > 0 && <Appbar.BackAction onPress={decrementStep} />}
                <Appbar.Content title={`Шаг ${step + 1} из 3`} />
            </Appbar.Header>

            <SafeAreaView>
                <View className={styles.centerContainer}>
                    {step == 0 && (
                        <>
                            <Image
                                className={styles.welcomeLogo}
                                source={require(`../../images/logo.png`)}
                                alt="FatLook logo icon"
                            />
                            <Text className={styles.welcomeInfo}>
                                Для того чтобы тренер видел ваш прогресс, нужно запросить доступ к&nbsp;шагам, весу
                                и&nbsp;еде.
                            </Text>
                            <Text className={styles.welcomeInfo}>
                                Также нам нужна ваша ссылка в&nbsp;FatSecret для идентификации.
                            </Text>
                            <Button mode="contained" onPress={incrementStep}>
                                Начать
                            </Button>
                        </>
                    )}

                    {step == 1 && (
                        <View className={styles.welcomeActions}>
                            <FatSecretLink onSave={incrementStep} autoFocus={true} />
                        </View>
                    )}

                    {step == 2 && (
                        <>
                            {Platform.OS === 'ios' && (
                                <Image
                                    className={styles.welcomeLogo}
                                    source={require(`../../images/health/ios.png`)}
                                    alt="Apple Health icon"
                                />
                            )}

                            {Platform.OS === 'android' && (
                                <Image
                                    className={styles.welcomeLogo}
                                    source={require(`../../images/health/android.png`)}
                                    alt="Android Health Connect icon"
                                />
                            )}

                            <Text className={styles.welcomeInfo}>
                                Теперь нужно запросить доступ к шагам, весу и еде.
                            </Text>

                            <Button mode="contained" onPress={request}>
                                Получить разрешение
                            </Button>
                        </>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};
