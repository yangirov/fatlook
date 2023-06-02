import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';

import styles from './IconButton.module.scss';

type IconButtonProps = ButtonProps & { children: ReactNode };

export const IconButton: FC<IconButtonProps> = ({ children, className, ...propsRest }) => (
    <Button className={classNames(styles.iconButton, className)} {...propsRest}>
        <Icon>{children}</Icon>
    </Button>
);
