import React, { FC } from 'react';
import classnames from 'classnames';

import { Button, ButtonProps } from '../Button';

import styles from './IconButton.module.scss';

type IconRenderable = {
    renderIcon?: (...args: unknown[]) => React.ReactNode;
};

type Pressable = {
    pressed?: boolean;
};

type IconButtonProps = ButtonProps & IconRenderable & Pressable;

export const IconButton: FC<IconButtonProps> = ({ children, className, pressed, renderIcon, ...propsRest }) => (
    <Button className={classnames(styles.iconButton, className)} isPressed={pressed} {...propsRest}>
        {children ?? (typeof renderIcon === 'function' && renderIcon(pressed))}
    </Button>
);
