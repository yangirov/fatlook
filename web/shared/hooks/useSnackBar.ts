import { useContext } from 'react';

import { SnackBarContext } from '../ui';

export const useSnackBar = () => {
    const snackBarContext = useContext(SnackBarContext);

    const show = (message: string) => {
        snackBarContext.show(message);
    };

    return { show };
};
