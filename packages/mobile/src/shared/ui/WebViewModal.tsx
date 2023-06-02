import { FC, createContext, useContext, useEffect, useRef, useState } from 'react';

import { FAT_SECRET_INSTRUCTIONS } from '@env';
import { ActivityIndicator, Share } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Appbar, Portal } from 'react-native-paper';
import { WebView } from 'react-native-webview';

import { APP_NAME } from '@fatlook/core/utils';
import styles from '@/mobile/styles/styles.module.scss';

import { useAppTheme } from '../hooks';

const webViewInjected = (url: string) => {
    if (url.includes(FAT_SECRET_INSTRUCTIONS)) {
        return `
            function removeDiv(selector) {
                document.querySelector(selector).style.display = "none"
            }
            setTimeout(() => {
                removeDiv(".menu");
                removeDiv(".article__author");
                removeDiv(".article__status");
                removeDiv(".article__badges");
                document.querySelector(".article").style.padding = "0";
            }, 0);
            true;
        `;
    }

    return '';
};

type WebViewContextProps = {
    title: string;
    url: string;
    isVisible: boolean;
    show: (title: string, url: string) => void;
    close: () => void;
};

export const WebViewContext = createContext<WebViewContextProps>({} as WebViewContextProps);

export const WebViewModal: FC = () => {
    const webViewRef = useRef<WebView>(null);
    const [userAgent, setUserAgent] = useState('');

    useEffect(() => {
        DeviceInfo.getUserAgent().then(userAgent => {
            const customUserAgent = `${userAgent} ${APP_NAME}`;
            setUserAgent(customUserAgent);
        });
    }, []);

    const theme = useAppTheme();
    const [loading, setLoading] = useState(true);
    const ctx = useContext(WebViewContext);

    const sharePage = async () => {
        await Share.share({
            message: ctx.title,
            url: ctx.url,
        });
    };

    return (
        <Portal>
            <Appbar.Header>
                <Appbar.BackAction onPress={ctx.close} />
                <Appbar.Content title={ctx.title} />
                <Appbar.Action icon="share" onPress={sharePage} />
            </Appbar.Header>
            {loading && (
                <ActivityIndicator
                    className={styles.webViewLoader}
                    animating={loading}
                    color={theme.colors.primary}
                    size="large"
                />
            )}
            <WebView
                ref={webViewRef}
                source={{ uri: ctx.url }}
                userAgent={userAgent}
                javaScriptEnabled={true}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => {
                    setLoading(false);
                    webViewRef.current?.injectJavaScript(webViewInjected(ctx.url));
                }}
            />
        </Portal>
    );
};

export const WebViewContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);

    const onClose = () => {
        setIsVisible(false);
    };

    const onShow = (title: string, url: string) => {
        setIsVisible(true);
        setTitle(title);
        setUrl(url);
    };

    return (
        <WebViewContext.Provider
            value={{
                title,
                url,
                isVisible,
                show: onShow,
                close: onClose,
            }}
        >
            {children}
        </WebViewContext.Provider>
    );
};
