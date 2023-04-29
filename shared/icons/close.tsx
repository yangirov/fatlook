import React, { FC } from 'react';

import { asIcon, Colorable } from '@/shared/ui';

const CloseCurve: FC<Colorable> = ({ color }) => {
    return (
        <g transform="rotate(-45 5.879 13.121)" fillRule="evenodd" fill={color}>
            <rect x="10.27" y=".259" width="1.668" height="21.69" rx=".834" />
            <path d="M.26 11.104c0-.46.373-.834.834-.834h20.021a.834.834 0 110 1.669H1.094a.834.834 0 01-.835-.835z" />
        </g>
    );
};

const DEFAULTS_CONFIG = {
    width: 16,
    height: 16
} as const;

export const CloseIcon = asIcon(CloseCurve, DEFAULTS_CONFIG);
