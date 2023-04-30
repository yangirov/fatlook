'use client';
import { FC, createContext, useContext, useState } from 'react';
import classnames from 'classnames';

import styles from './Accordion.module.scss';
import { AccordionContextType, AccordionProps, FCWithChild } from './types';

export const AccordionContext = createContext({} as AccordionContextType);

const AccordionWrapper: FC<AccordionProps> = ({ children, className }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <AccordionContext.Provider value={{ isOpen, setOpen }}>
            <div className={classnames(styles.accordion, className)}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionHeader: FC<FCWithChild> = ({ children }) => <>{children}</>;

const AccordionContent: FC<FCWithChild> = ({ children }) => {
    const { isOpen } = useContext(AccordionContext);

    return (
        <div
            className={classnames(styles.accordionContent, {
                [styles.accordionContentCollapsed]: !isOpen
            })}
        >
            {children}
        </div>
    );
};

const accordionComposition = {
    Header: AccordionHeader,
    Content: AccordionContent
};

export const Accordion = Object.assign(AccordionWrapper, accordionComposition);
