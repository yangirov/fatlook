import { useSnackBar } from './useSnackBar';

export const useSharePage = () => {
    const snackBar = useSnackBar();

    const share = (title: string, text?: string) => {
        if (navigator.share) {
            navigator
                .share({
                    url: location.href,
                    title,
                    text,
                })
                .then(console.log)
                .catch(console.error);
        } else {
            navigator.clipboard
                .writeText(location.href)
                .then(() => snackBar.show('Ссылка скопирована в буфер обмена'))
                .catch(console.error);
        }
    };

    return { share };
};
