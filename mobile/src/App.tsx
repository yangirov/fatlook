import React, { useEffect, useState } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import {
    initialize,
    requestPermission,
    readRecords,
    getSdkStatus,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';

const formatDateToISO = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

function App(): JSX.Element {
    const [steps, setSteps] = useState(0);
    const [weight, setWeight] = useState(0);

    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    useEffect(() => {
        async function androidTask() {
            const status = await getSdkStatus();
            if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
                console.log('SDK is available');
            }

            if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
                console.log('SDK is not available');
            }

            if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
                console.log('SDK is not available, provider update required');
            }

            const isInitialized = await initialize();
            console.log({ isInitialized });

            const grantedPermissions = await requestPermission([
                { accessType: 'read', recordType: 'Weight' },
                { accessType: 'read', recordType: 'Steps' },
            ]);

            console.log({ grantedPermissions });

            const time = {
                startTime: formatDateToISO(new Date(2023, 5, 21)),
                endTime: formatDateToISO(new Date(2023, 5, 23)),
            };

            const weightResult = await readRecords('Weight', {
                timeRangeFilter: {
                    operator: 'between',
                    ...time,
                },
            });
            const stepsResult = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: 'between',
                    ...time,
                },
            });

            setWeight(weightResult[0].weight.inKilograms);
            setSteps(stepsResult[0].count);
        }

        if (isAndroid === true) {
            androidTask();
        }

        if (isIOS === true) {
            const permissions = {
                permissions: {
                    read: [
                        AppleHealthKit.Constants.Permissions.Weight,
                        AppleHealthKit.Constants.Permissions.Steps,
                        AppleHealthKit.Constants.Permissions.StepCount,
                    ],
                    write: [],
                },
            } as HealthKitPermissions;

            AppleHealthKit.initHealthKit(permissions, (error: string) => {
                if (error) {
                    console.log('[ERROR] Cannot grant permissions!');
                }

                AppleHealthKit.getLatestWeight({}, (err: string, result: HealthValue) => {
                    console.log({ err, result });

                    if (!err && result) {
                        setWeight(result.value);
                    }
                });

                AppleHealthKit.getStepCount(
                    {
                        startDate: new Date(2022, 5, 22).toISOString(),
                    },
                    (err: string, result: HealthValue) => {
                        console.log({ err, result });

                        if (!err && result) {
                            setSteps(result.value);
                        }
                    }
                );
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>Steps: {steps}</Text>
            <Text>Weight: {weight !== null ? `${weight} kg` : 'No data'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
