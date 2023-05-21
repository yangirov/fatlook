'use client';
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';

import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

import { Spinner } from '../Spinner';

import styles from './Button.module.scss';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'aria-pressed' | 'disabled'> & {
    href?: LinkProps['href'];
    disabled?: boolean;
    isPressed?: boolean;
};

export const Button: FC<ButtonProps> = ({
    children = null,
    className,
    disabled = false,
    href,
    type = 'button',
    isPressed,
    onClick,
    ...propsRest
}) => {
    const [hasHover, setHasHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const createClassName = (rootClassName: string) =>
        classNames(
            rootClassName,
            {
                [styles.active]: isActive && !disabled,
                [styles.disabled]: disabled,
                [styles.hasHover]: hasHover && !disabled,
                [styles.loading]: children === 'loading',
            },
            className
        );

    const tabIndex = disabled ? -1 : undefined;

    useEffect(() => {
        const handleMouseUp = () => {
            setIsActive(prevIsActive => {
                if (prevIsActive) {
                    return false;
                }

                return prevIsActive;
            });
        };

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const commonMouseHandlers = {
        onMouseEnter: () => {
            setHasHover(true);
        },
        onMouseLeave: () => {
            setHasHover(false);
        },
        onMouseDown: () => {
            if (!disabled) {
                setIsActive(true);
            }
        },
    };

    if (href) {
        return (
            <Link
                className={classNames(styles.linkRoot, className)}
                href={href}
                tabIndex={tabIndex}
                {...commonMouseHandlers}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={createClassName(styles.buttonRoot)}
            type={type}
            tabIndex={tabIndex}
            aria-disabled={disabled}
            aria-pressed={isPressed}
            onClick={event => {
                if (!disabled && typeof onClick === 'function') {
                    onClick(event);
                }
            }}
            {...commonMouseHandlers}
            {...propsRest}
        >
            {children === 'loading' ? <Spinner className={styles.buttonSpinner} /> : children}
        </button>
    );
};
