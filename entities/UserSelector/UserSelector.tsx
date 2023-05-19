import { FC, useState } from 'react';
import { usePathname, useSearchParams, useParams, useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/store';
import { Modal } from '@/shared/ui';
import { getUserById } from '@/shared/store/usersReducer';

import styles from './UserSelector.module.scss';

const extractBasePath = (url: string | null) => {
    const matches = url?.match(/\/\w+\//);
    return matches && matches.length > 0 ? matches[0] : null;
};

export const UserSelector: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();

    const users = useAppSelector(state => state.users.users);
    const userId = params?.userId ? params?.userId.toString() : undefined;
    const user = useAppSelector(state => getUserById(state, userId));

    const onToggle = () => {
        setIsOpen(prev => !prev);
    };

    const onUserChange = (userId: string) => {
        const sp = new URLSearchParams(searchParams as unknown as URLSearchParams);
        const newUrl = `${extractBasePath(pathname)}${userId}?${sp}`;
        router.push(newUrl);
    };

    if (!users || !userId || !user) {
        return null;
    }

    return (
        <>
            <div className={styles.userSelector} onClick={onToggle}>
                <div className={styles.userSelectorName}>{user.name}</div>
                <div className={styles.userSelectorToggler}>▾</div>
            </div>

            <Modal isOpen={isOpen} onToggle={onToggle}>
                <Modal.Title>Клиенты</Modal.Title>
                <Modal.Content>
                    {users.map(({ id, name }) => (
                        <div key={id} className={styles.userSelectorItem} onClick={() => onUserChange(id)}>
                            {name}
                        </div>
                    ))}
                </Modal.Content>
            </Modal>
        </>
    );
};
