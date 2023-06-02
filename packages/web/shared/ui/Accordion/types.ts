import { SetStateAction, ReactNode } from 'react';

export type AccordionProps = {
    children: ReactNode;
    className?: string;
    onChange?: () => void;
};

export type FCWithChild = { className?: string; children: ReactNode };

export type AccordionContextType = {
    isOpen: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
};
