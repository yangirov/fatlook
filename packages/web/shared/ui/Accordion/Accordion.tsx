'use client';
import { FC, createContext, useContext, useState } from 'react';

import classNames from 'classnames';

import { AccordionContextType, AccordionProps, FCWithChild } from './types';

import styles from './Accordion.module.scss';

export const AccordionContext = createContext({} as AccordionContextType);

const AccordionWrapper: FC<AccordionProps> = ({ children, className, onChange }) => {
    const [isOpen, setOpen] = useState(false);

    const handleToggle = () => {
        if (onChange) onChange();
        setOpen(prev => !prev);
    };

    return (
        <AccordionContext.Provider value={{ isOpen, setOpen: handleToggle }}>
            <div className={className}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionHeader: FC<FCWithChild> = ({ children }) => <>{children}</>;

const AccordionContent: FC<FCWithChild> = ({ children, className }) => {
    const { isOpen } = useContext(AccordionContext);

    return (
        <div
            className={classNames(styles.accordionContent, className, {
                [styles.accordionContentCollapsed]: !isOpen,
            })}
        >
            {children}
        </div>
    );
};

const accordionComposition = {
    Header: AccordionHeader,
    Content: AccordionContent,
};

export const Accordion = Object.assign(AccordionWrapper, accordionComposition);
