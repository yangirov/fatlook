import { FC } from 'react';
import classNames from 'classnames';

import styles from './ToggleSwitch.module.scss';

export type ToggleSwitchProps = {
    onChange: (state: boolean) => void;
    checked: boolean;
    name?: string;
    text?: string;
    disabled?: boolean;
    withText?: boolean;
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, onChange, name, disabled, text, withText = true }) => {
    if (!name) {
        name = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    }

    return (
        <div className={styles.toggleSwitchWrapper}>
            {text && <div className={styles.toggleSwitchText}>{text}</div>}
            <div className={classNames(styles.toggleSwitch, { [styles.toggleSwitchDisabled]: disabled === true })}>
                <input
                    checked={checked}
                    disabled={disabled}
                    onChange={e => onChange(e.target.checked)}
                    type="checkbox"
                    className={styles.toggleSwitchCheckbox}
                    name={name}
                    id={name}
                />

                <label className={styles.toggleSwitchLabel} htmlFor={name}>
                    <span
                        className={classNames(styles.toggleSwitchInner, {
                            [styles.toggleSwitchInnerWithText]: withText === true,
                        })}
                    ></span>
                    <span className={styles.toggleSwitchCircle}></span>
                </label>
            </div>
        </div>
    );
};
