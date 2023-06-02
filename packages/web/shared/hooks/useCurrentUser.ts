import { useEffect, useMemo, useState } from 'react';

import { useParams } from 'next/navigation';

import { useAppSelector } from '../store';
import { getUserById } from '../store/usersReducer';

export const useCurrentUser = () => {
    const params = useParams();
    const [userId, setUserId] = useState<string>();

    const user = useAppSelector(state => getUserById(state, userId));

    const memoParams = useMemo(() => {
        return params ? params : undefined;
    }, [params]);

    useEffect(() => {
        if (memoParams?.userId !== userId) {
            setUserId(memoParams?.userId?.toString());
        }
    }, [memoParams, userId]);

    return user;
};
