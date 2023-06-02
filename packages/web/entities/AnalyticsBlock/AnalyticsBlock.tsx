import { FC } from 'react';

import { Analytics } from '@vercel/analytics/react';

import { isDev } from '@fatlook/core/utils';

export const AnalyticsBlock: FC = () => {
    if (isDev) return null;

    return <Analytics />;
};
