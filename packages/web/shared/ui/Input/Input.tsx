import { FC } from 'react';

import classNames from 'classnames';

import styles from './Input.module.scss';

type InputProps = {
    value?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (event: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name?: any;
    placeholder?: string;
    pattern?: string;
    step?: string;
    type?: 'submit' | 'tel' | 'text' | 'time' | 'url' | 'email' | 'number' | 'password' | 'hidden';
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    className?: string;
};

export const Input: FC<InputProps> = ({
    value,
    onChange,
    name,
    type = 'text',
    placeholder,
    pattern,
    required: isRequired = false,
    readonly: isReadOnly = false,
    disabled: isDisabled = false,
    className,
    ...rest
}) => {
    return (
        <input
            className={classNames(styles.input, className)}
            type={type}
            placeholder={placeholder}
            name={name}
            required={isRequired}
            readOnly={isReadOnly}
            disabled={isDisabled}
            pattern={pattern}
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            {...rest}
        />
    );
};
