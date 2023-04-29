'use client';
import { FC, useContext } from 'react';
import classnames from 'classnames';

import styles from './Accordion.module.scss';

export type AccordionProps = {
    children: React.ReactNode;
    className?: string;
};

type FCWithChild = { children: React.ReactNode };

type AccordionCmp = FC<AccordionProps> & {
    Header: FC<FCWithChild>;
    Content: FC<FCWithChild & { onToggle: () => void }>;
};

// export const AccordionContext = createContext({
//     isOpen: false,
//     setOpen: (state: boolean) => {}
// });

const Accordion: AccordionCmp = ({ children, className }) => {
    // const [isOpen, setOpen] = useState(false);

    return (
        // <AccordionContext.Provider value={{ isOpen, setOpen }}>
        <div className={classnames(styles.accordion, className)}>{children}</div>
        // </AccordionContext.Provider>
    );
};

const Header: FC<FCWithChild> = ({ children }): JSX.Element => <>{children}</>;

const Content: FC<FCWithChild & { onToggle: () => void }> = ({ children }): JSX.Element => {
    // const { isOpen } = useContext(AccordionContext);

    return (
        <div
        // className={classnames(styles.accordionContent, {
        //     [styles.collapsed]: isOpen === false
        // })}
        >
            {children}
        </div>
    );
};

Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
