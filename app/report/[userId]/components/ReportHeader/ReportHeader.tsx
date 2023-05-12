'use client';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SlArrowLeft } from 'react-icons/sl';
import classNames from 'classnames';

import DatePicker from '@/shared/ui/DatePicker';
import { Accordion, AccordionContext, IconButton, Overlay } from '@/shared/ui';
import { beautifyDate, formatDate, parseDate } from '@/shared/utils';
import { useAppSelector } from '@/shared/store';
import { getUserById } from '@/shared/store/usersReducer';

import styles from './ReportHeader.module.scss';
import { ReportContext } from '../../Report';

type HeaderProps = {
    date: Date | null;
    month: string | null;
};

const Header: FC<HeaderProps> = ({ date, month }) => {
    const params = useParams();
    const userId = params?.userId.toString() ?? '';

    const user = useAppSelector(state => getUserById(state, userId));

    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.reportHeaderControls}>
                <div className={styles.reportHeaderBack}>
                    <IconButton href="/">
                        <SlArrowLeft />
                    </IconButton>
                </div>

                <div
                    onClick={onToggle}
                    className={classNames(styles.reportHeaderDate, {
                        [styles.reportHeaderDateExpanded]: isOpen
                    })}
                >
                    {isOpen && month ? month : beautifyDate(date)}
                </div>

                <div className={styles.reportHeaderUser}>{user?.name}</div>
            </div>
            {isOpen && <Overlay className={styles.reportHeaderOverlay} onClose={onToggle} />}
        </>
    );
};

type ContentProps = {
    date: Date | null;
    setMonth: React.Dispatch<React.SetStateAction<string | null>>;
};

const Content: FC<ContentProps> = ({ date, setMonth }) => {
    // FIXME: https://github.com/vercel/next.js/discussions/41868
    const searchParams = useSearchParams() as unknown as URLSearchParams;

    const router = useRouter();
    const params = useParams();

    const handleDateChange = (date: Date | null) => {
        if (!date) return;

        if (params && searchParams) {
            const sp = new URLSearchParams(searchParams);

            const formattedDate = formatDate(date);
            sp.set('date', formattedDate);

            router.push(`/report/${params?.userId}?${sp}`);
        }
    };

    const handleMonthChange = (month: string) => setMonth(month);

    if (!date) return null;

    return (
        <div className={styles.reportHeaderDatePicker}>
            <DatePicker date={date} onDateChange={handleDateChange} onMonthChange={handleMonthChange} />
        </div>
    );
};

const ReportHeader: FC = () => {
    const {
        report: { date: reportDate }
    } = useContext(ReportContext);

    const [month, setMonth] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const parsedDate = parseDate(reportDate);
        setDate(parsedDate);
    }, [reportDate]);

    return (
        <Accordion>
            <Accordion.Header>
                <Header date={date} month={month} />
            </Accordion.Header>
            <Accordion.Content>
                <Content date={date} setMonth={setMonth} />
            </Accordion.Content>
        </Accordion>
    );
};

export default ReportHeader;
