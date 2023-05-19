'use client';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { FiShare } from 'react-icons/fi';
import classNames from 'classnames';
import Image from 'next/image';

import { PWA_INSTALL_PROPOSAL } from '@/shared/consts';
import { useDeviceDetect } from '@/shared/hooks';
import { Button, Modal } from '@/shared/ui';

import styles from './PwaModal.module.scss';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

const getVisibleFromLocalState = () => {
    const nextProposalDate = localStorage.getItem(PWA_INSTALL_PROPOSAL);

    if (nextProposalDate && Number(nextProposalDate) > new Date().getTime()) return false;

    localStorage.removeItem(PWA_INSTALL_PROPOSAL);
    return true;
};

export const PwaModal: FC = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

    const [isVisible, setVisible] = useState(false);
    const { isDesktop, isAndroid, isIOS } = useDeviceDetect();

    useLayoutEffect(() => {
        const state = getVisibleFromLocalState();
        setVisible(state);
    }, []);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();

            setSupportsPWA(true);
            setPromptInstall(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const addToHomeScreen = async () => {
        if (!promptInstall) {
            return;
        }

        promptInstall.prompt();
        promptInstall.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                setVisible(false);
                localStorage.removeItem(PWA_INSTALL_PROPOSAL);
            } else {
                onToggle();
            }

            setPromptInstall(null);
        });
    };

    const onToggle = () => {
        setVisible(prev => !prev);

        const nextProposalDate = addDays(new Date(), 3).getTime();
        localStorage.setItem(PWA_INSTALL_PROPOSAL, JSON.stringify(nextProposalDate));
    };

    if (isDesktop) return null;

    if (!promptInstall && isAndroid) return null;

    if (!supportsPWA && isAndroid) return null;

    if (!isVisible) return null;

    return (
        <Modal
            isOpen={isVisible}
            onToggle={onToggle}
            className={classNames(styles.pwaModal, { [styles.pwaModalIsIos]: isIOS })}
        >
            <Modal.Title> </Modal.Title>
            <Modal.Content>
                <div className={styles.pwaModalWrapper}>
                    <div className={styles.pwaModalIcon}>
                        <Image src="/favicon/logo.svg" alt="FatLook" width={67} height={67} />
                    </div>

                    <div className={styles.pwaModalText}>
                        <div className={styles.pwaModalTextTitle}>Установи приложение</div>
                        <div className={styles.pwaModalTextSubTitle}>
                            {isAndroid
                                ? 'Так приложение появится на домашнем экране'
                                : 'Нажми на эту кнопку и выбери «На экран домой»'}
                        </div>
                    </div>

                    <div className={styles.pwaModalButtons}>
                        {isAndroid && (
                            <Button className={styles.pwaModalButton} onClick={addToHomeScreen}>
                                Установить
                            </Button>
                        )}

                        {isIOS && (
                            <div className={styles.pwaModalIos}>
                                <div className={styles.pwaModalIosIcon}>
                                    <FiShare />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};
