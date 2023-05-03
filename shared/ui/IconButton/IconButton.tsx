import React, { FC } from 'react';
import classNames from 'classnames';

import { Button, ButtonProps } from '../Button';

import styles from './IconButton.module.scss';
import { Icon } from '../Icon';

type IconButtonProps = ButtonProps & { children: React.ReactNode };

export const IconButton: FC<IconButtonProps> = ({ children, className, ...propsRest }) => (
    <Button className={classNames(styles.iconButton, className)} {...propsRest}>
        <Icon>{children}</Icon>
    </Button>
);
