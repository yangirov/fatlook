import { FC } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import styles from './Overlay.module.scss';

type OverlayProps = {
    className?: string;
    onClick?: () => void;
};

export const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
    return createPortal(<div className={classNames(styles.overlay, className)} onClick={onClick} />, document.body);
};
