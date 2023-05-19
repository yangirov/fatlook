'use client';
import React from 'react';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import { Transition, TransitionStatus } from 'react-transition-group';
import classNames from 'classnames';

import { Overlay } from '../Overlay';

import styles from './Modal.module.scss';

export type ModalProps = {
    className?: string;
    children: React.ReactNode[];
    isOpen: boolean;
    onToggle: () => void;
};

const duration = 200;

const defaultStyle = {
    transition: `transform ${duration}ms ease`,
    transform: 'translateY(100%)',
    opacity: 0,
};

const transitionStyles: { [key in TransitionStatus]?: React.CSSProperties } = {
    entering: { transform: 'translateY(100%)', opacity: 0 },
    entered: { transform: 'translateY(0)', opacity: 1 },
    exited: { transform: 'translateY(100%)', opacity: 0 },
    exiting: { transform: 'translateY(100%)', opacity: 0 },
};

const ModalWrapper: FC<ModalProps> = ({ className, isOpen, children, onToggle }: ModalProps) => {
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

    let modalTitle: ReactNode = null;
    let modalContent: ReactNode = null;

    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            switch (child.type) {
                case ModalTitle:
                    modalTitle = child;
                    break;
                case ModalContent:
                    modalContent = child;
                    break;
                default:
                    break;
            }
        }
    });

    return (
        <Transition unmountOnExit mountOnEnter appear in={isOpen} timeout={duration} nodeRef={modalRef}>
            {state => (
                <>
                    <div
                        className={styles.modal}
                        style={{
                            ...defaultStyle,
                            ...(transitionStyles[state] || {}),
                        }}
                        ref={modalRef}
                    >
                        <div className={classNames(styles.modalWrapper, className)} ref={wrapperRef}>
                            <div className={styles.modalHeader}>
                                {modalTitle}
                                <div onClick={onToggle} className={styles.modalHeaderIcon}>
                                    <MdClose color="var(--green)" size={30} />
                                </div>
                            </div>

                            {modalContent}
                        </div>
                    </div>
                    <Overlay />
                </>
            )}
        </Transition>
    );
};

const ModalTitle: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={styles.modalTitle}>{children}</div>
);

const ModalContent: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={styles.modalContent}>{children}</div>
);

const ModalPortal: FC<ModalProps> = props => createPortal(<ModalWrapper {...props} />, document.body);

const modalComposition = {
    Title: ModalTitle,
    Content: ModalContent,
};

export const Modal = Object.assign(ModalPortal, modalComposition);
