import React from 'react';

import { asIcon, Colorable } from '@/shared/ui';

const HomeCurve: React.FC<Colorable> = ({ color }) => {
    return (
        <path
            d="M18.958 19.792h-6.375a.836.836 0 01-.833-.834V15c0-1-.792-1.792-1.792-1.792S8.167 14 8.167 15v3.958a.836.836 0 01-.834.834H1.042a.836.836 0 01-.834-.834V8.292c0-.75.375-1.459.959-1.875L9.542.375a.813.813 0 01.958 0l8.375 6.042c.583.416.958 1.125.958 1.875V19a.899.899 0 01-.875.792zm-5.541-1.625h4.75V8.292a.712.712 0 00-.292-.542L10 2.042 2.125 7.708a.712.712 0 00-.292.542v9.875h4.75V15A3.432 3.432 0 0110 11.583 3.432 3.432 0 0113.417 15v3.167z"
            fill={color}
        />
    );
};

const DEFAULTS_CONFIG = {
    width: 24,
    height: 24
} as const;

export const HomeIcon = asIcon(HomeCurve, DEFAULTS_CONFIG);
