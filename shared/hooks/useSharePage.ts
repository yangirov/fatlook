import { useContext } from 'react';

import { SnackBarContext } from '../ui';

export const useSharePage = () => {
    const snackBarContext = useContext(SnackBarContext);

    const onShare = (title: string, text?: string) => {
        if (navigator.share) {
            navigator
                .share({
                    url: location.href,
                    title,
                    text
                })
                .then(console.log)
                .catch(console.error);
        } else {
            navigator.clipboard
                .writeText(location.href)
                .then(() => snackBarContext.show('Ссылка скопирована в буфер обмена'))
                .catch(console.error);
        }
    };

    return [onShare];
};
