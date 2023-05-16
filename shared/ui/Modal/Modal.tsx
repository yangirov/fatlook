'use client';
import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import { Transition, TransitionStatus } from 'react-transition-group';

import { IconButton } from '../IconButton';

import styles from './Modal.module.scss';
import { Overlay } from '../Overlay';

export type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
};

const duration = 200;

const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateY(100%)',
    opacity: 0
};

const transitionStyles: { [key in TransitionStatus]?: React.CSSProperties } = {
    entering: { transform: 'translateY(100%)', opacity: 0 },
    entered: { transform: 'translateY(0)', opacity: 1 },
    exited: { transform: 'translateY(100%)', opacity: 0 },
    exiting: { transform: 'translateY(100%)', opacity: 0 }
};

const ModalWrapper: FC<ModalProps> = ({ isOpen, children, onToggle }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                onToggle();
            }
        };

        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, [onToggle]);

    return (
        <Transition unmountOnExit mountOnEnter appear in={isOpen} timeout={duration} nodeRef={modalRef}>
            {state => (
                <>
                    <div
                        className={styles.modal}
                        style={{
                            ...defaultStyle,
                            ...(transitionStyles[state] || {})
                        }}
                        ref={modalRef}
                    >
                        <div className={styles.modalWrapper} ref={wrapperRef}>
                            <div className={styles.modalCloseButton}>
                                <IconButton onClick={onToggle} className={styles.modalCloseButtonIcon}>
                                    <MdClose color="var(--green)" size={30} />
                                </IconButton>
                            </div>

                            <div className={styles.modalContent}>{children}</div>
                        </div>
                    </div>
                    <Overlay />
                </>
            )}
        </Transition>
    );
};

export const Modal: FC<ModalProps> = props => createPortal(<ModalWrapper {...props} />, document.body);
