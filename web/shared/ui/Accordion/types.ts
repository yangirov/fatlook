import { SetStateAction } from 'react';

export type AccordionProps = {
    children: React.ReactNode;
    className?: string;
    onChange?: () => void;
};

export type FCWithChild = { className?: string; children: React.ReactNode };

export type AccordionContextType = {
    isOpen: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
};