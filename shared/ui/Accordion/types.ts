import { SetStateAction } from 'react';

export type AccordionProps = {
    children: React.ReactNode;
    className?: string;
};

export type FCWithChild = { children: React.ReactNode };

export type AccordionContextType = {
    isOpen: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
};
