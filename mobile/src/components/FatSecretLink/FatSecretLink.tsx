import { FC, useEffect, useRef, useState } from 'react';

import { FAT_SECRET_INSTRUCTIONS } from '@env';
import { Settings, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { getUserId } from '@/core/utils';

import { FAT_SECRET_USER_ID, FAT_SECRET_USER_REPORT_URL } from '@/mobile/shared';
import { OpenURLButton } from '@/mobile/shared/ui';
import styles from '@/mobile/styles/styles.module.scss';

type FatSecretLinkProps = {
    autoFocus?: boolean;
    onSave?: () => void;
    onClear?: () => void;
};

export const FatSecretLink: FC<FatSecretLinkProps> = ({ autoFocus = false, onSave, onClear }) => {
    // eslint-disable-next-line
    const inputRef = useRef<any>(null);

    const [link, setLink] = useState(() => Settings.get(FAT_SECRET_USER_REPORT_URL));
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        if (autoFocus === true && inputRef.current) {
            inputRef.current?.focus();
        }
    }, [autoFocus, inputRef]);

    const onClearFatSecretLinkInput = () => {
        Settings.set({ [FAT_SECRET_USER_ID]: '' });
        Settings.set({ [FAT_SECRET_USER_REPORT_URL]: '' });

        setLink('');
        setHasErrors(false);

        onClear && onClear();
    };

    const onSaveFatSecretLink = () => {
        const userId = getUserId(link);

        if (userId) {
            Settings.set({ [FAT_SECRET_USER_ID]: userId });
            Settings.set({ [FAT_SECRET_USER_REPORT_URL]: link });

            onSave && onSave();
        } else {
            setHasErrors(true);
            Settings.set({ [FAT_SECRET_USER_ID]: '' });
        }
    };

    return (
        <>
            <TextInput
                ref={inputRef}
                inputMode="url"
                mode="outlined"
                dense={true}
                label="Ссылка на FatSecret"
                value={link}
                onChangeText={text => setLink(text)}
                right={<TextInput.Icon icon="close" onPress={onClearFatSecretLinkInput} />}
                style={{ textAlign: 'auto' }}
            />

            {hasErrors && (
                <HelperText type="error" visible={hasErrors} className={styles.welcomeInputError}>
                    Введите корректную ссылку
                </HelperText>
            )}

            <View className={styles.welcomeActions}>
                <OpenURLButton url={FAT_SECRET_INSTRUCTIONS} title="Как получить ссылку?" />
                <Button mode="contained" onPress={onSaveFatSecretLink}>
                    Сохранить
                </Button>
            </View>
        </>
    );
};
