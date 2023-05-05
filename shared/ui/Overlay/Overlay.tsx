import { FC } from 'react';

import { createPortal } from 'react-dom';
import classNames from 'classnames';

import styles from './Overlay.module.scss';

type OverlayProps = {
    className?: string;
    onClose?: () => void;
};

export const Overlay: FC<OverlayProps> = ({ className, onClose }) => {
    return createPortal(<div className={classNames(styles.overlay, className)} onClick={onClose} />, document.body);
};
