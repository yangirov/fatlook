import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
    const [isMobile, setMobile] = useState(false);
    const [isDesktop, setDesktop] = useState(false);
    const [isAndroid, setAndroid] = useState(false);
    const [isIOS, setIOS] = useState(false);

    useEffect(() => {
        const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

        const isAndroid = () => Boolean(userAgent.match(/Android/i));
        const isIOS = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
        const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
        const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
        const isSSR = () => Boolean(userAgent.match(/SSR/i));

        const isMobile = () => Boolean(isAndroid() || isIOS() || isOpera() || isWindows());
        const isDesktop = () => Boolean(!isMobile() && !isSSR());

        setMobile(isMobile);
        setDesktop(isDesktop);
        setAndroid(isAndroid);
        setIOS(isIOS);
    }, []);

    return { isMobile, isDesktop, isAndroid, isIOS };
};
