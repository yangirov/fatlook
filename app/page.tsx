import Link from 'next/link';
import { formatDate } from '@/shared/utils';

export default async function Home() {
    const d = new Date();
    d.setDate(d.getDate() - 1);

    const getReport = (userId: string) => {
        return `/report/${userId}?date=${formatDate(d)}`;
    };

    return (
        <ul>
            <li>
                <Link href={getReport('99339115')}>Emil</Link>
            </li>
            <li>
                <Link href={getReport('107059084')}>Slava</Link>
            </li>
            <li>
                <Link href={getReport('94936631')}>Nikita</Link>
            </li>
            <li>
                <Link href={getReport('37164713')}>Diana</Link>
            </li>
        </ul>
    );
}
