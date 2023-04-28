import Link from 'next/link';

export default async function Home() {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/report/99339115?date=23427">Emil</Link>
            </li>
            <li>
                <Link href="/settings">Settings</Link>
            </li>
        </ul>
    );
}
