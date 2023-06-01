import { useEffect, useState } from 'react';

import { APP_NAME } from '@/core/utils';

const hasCustomUserAgent = (substring: string) => navigator.userAgent.includes(substring);

export const useWebViewStatus = () => {
    const [isWebView, setIsWebView] = useState(false);

    useEffect(() => {
        const status = hasCustomUserAgent(APP_NAME);
        setIsWebView(status);
    }, []);

    return isWebView;
};
