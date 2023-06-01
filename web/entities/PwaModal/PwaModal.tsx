'use client';
import { FC, useEffect, useLayoutEffect, useState } from 'react';

import classNames from 'classnames';
import { addDays } from 'date-fns';
import Image from 'next/image';
import { FiShare } from 'react-icons/fi';

import { PWA_INSTALL_PROPOSAL } from '@/web/shared/consts';
import { useDeviceDetect, useWebViewStatus } from '@/web/shared/hooks';
import { Button, Modal } from '@/web/shared/ui';

import styles from './PwaModal.module.scss';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

interface ExtendedNavigator extends Navigator {
    standalone?: boolean;
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
    const [isVisible, setVisible] = useState(false);
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
    const [isAndroidPWA, setIsAndroidPWA] = useState(false);

    const isWebView = useWebViewStatus();
    const { isDesktop, isAndroid, isIOS } = useDeviceDetect();

    useLayoutEffect(() => {
        setIsAndroidPWA(window.matchMedia('(display-mode: standalone)').matches);
        setVisible(getVisibleFromLocalState());
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

    if (
        !isVisible ||
        isWebView ||
        isDesktop ||
        (isIOS && (navigator as ExtendedNavigator).standalone) ||
        (isAndroid && isAndroidPWA) ||
        (isAndroid && !promptInstall) ||
        (isAndroid && !supportsPWA)
    ) {
        return null;
    }

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
                            {isAndroid ? (
                                <p>Так приложение появится на домашнем экране</p>
                            ) : (
                                <p>
                                    Нажми на эту кнопку и выбери <br />
                                    «На экран домой»
                                </p>
                            )}
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
