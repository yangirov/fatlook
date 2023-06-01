'use client';
import { FC, useContext, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { beautifyDate, formatDate, parseDate } from '@/core/utils';
import { Accordion, AccordionContext, Overlay } from '@/web/shared/ui';
import DatePicker from '@/web/shared/ui/DatePicker';

import { ReportContext } from '../../Report';

import styles from './ReportHeader.module.scss';

type HeaderProps = {
    date: Date | null;
    month: string | null;
};

const Header: FC<HeaderProps> = ({ date, month }) => {
    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => setOpen(prev => !prev);

    return (
        <>
            <div
                onClick={onToggle}
                className={classNames(styles.reportHeaderDate, {
                    [styles.reportHeaderDateExpanded]: isOpen,
                })}
            >
                {isOpen && month ? month : beautifyDate(date)}
            </div>
            {isOpen && <Overlay className={styles.reportHeaderOverlay} onClick={onToggle} />}
        </>
    );
};

type ContentProps = {
    date: Date | null;
    setMonth: React.Dispatch<React.SetStateAction<string | null>>;
};

const Content: FC<ContentProps> = ({ date, setMonth }) => {
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

const ReportHeader: FC<{ defaultDate?: string }> = ({ defaultDate }) => {
    const {
        report: { date: reportDate },
    } = useContext(ReportContext);

    const [month, setMonth] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const parsedDate = defaultDate ? parseDate(defaultDate) : parseDate(reportDate);
        setDate(parsedDate);
    }, [defaultDate, reportDate]);

    return (
        <Accordion>
            <Accordion.Header>
                <Header date={date} month={month} />
            </Accordion.Header>
            <Accordion.Content className={styles.reportHeaderContent}>
                <Content date={date} setMonth={setMonth} />
            </Accordion.Content>
        </Accordion>
    );
};

export default ReportHeader;
