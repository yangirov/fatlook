import React, { FC } from 'react';

import { asIcon, Colorable } from '@/shared/ui';

const BackCurve: FC<Colorable> = ({ color }) => {
    return <polygon fill={color} points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" />;
};

const DEFAULTS_CONFIG = {
    width: 24,
    height: 24,
    viewBox: '0 0 512 512'
} as const;

export const BackIcon = asIcon(BackCurve, DEFAULTS_CONFIG);
