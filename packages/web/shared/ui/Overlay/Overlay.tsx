import { FC } from 'react';

import classNames from 'classnames';
import { createPortal } from 'react-dom';

import styles from './Overlay.module.scss';

type OverlayProps = {
    className?: string;
    onClick?: () => void;
};

export const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
    return (
        <>{createPortal(<div className={classNames(styles.overlay, className)} onClick={onClick} />, document.body)}</>
    );
};
