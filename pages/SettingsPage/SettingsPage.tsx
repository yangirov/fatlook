'use client';
import { FC } from 'react';

import styles from './SettingsPage.module.scss';

export interface SettingsPageProps {
    reportUrl?: string;
}

const SettingsPage: FC<SettingsPageProps> = ({ reportUrl }) => {
    return <div className={styles.settingsPage}>Hi, {reportUrl}</div>;
};

export default SettingsPage;
