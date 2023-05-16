import React, { FC } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Button, ButtonProps } from '../Button';

import styles from './IconButton.module.scss';

type IconButtonProps = ButtonProps & { children: React.ReactNode };

export const IconButton: FC<IconButtonProps> = ({ children, className, ...propsRest }) => (
    <Button className={classNames(styles.iconButton, className)} {...propsRest}>
        <Icon>{children}</Icon>
    </Button>
);
