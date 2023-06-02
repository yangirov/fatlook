import { FC, ReactNode } from 'react';

import { IconContext } from 'react-icons';

type IconProps = {
    className?: string;
    title?: string;
    color?: string;
    size?: string;
    children: ReactNode;
};

export const Icon: FC<IconProps> = ({ className, title, color, size, children }) => {
    const config = {
        title,
        color: color ?? 'var(--icon-color)',
        size: size ?? '1em',
        className: className ?? 'react-icon',
    };

    return <IconContext.Provider value={config}>{children}</IconContext.Provider>;
};
