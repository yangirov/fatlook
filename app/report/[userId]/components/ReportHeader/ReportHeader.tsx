'use client';
import { FC, useContext, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import DatePicker from '@/shared/ui/DatePicker';
import { Accordion, AccordionContext, IconButton } from '@/shared/ui';
import { ArrowIcon, SettingsIcon } from '@/shared/icons';
import { beautifyDate, formatDate, parseDate } from '@/shared/utils';

import styles from './ReportHeader.module.scss';

type HeaderProps = {
    date: Date | null;
    month: string | null;
};

const Header: FC<HeaderProps> = ({ date, month }) => {
    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className={styles.reportHeaderControls}>
            <IconButton href="/">
                <ArrowIcon />
            </IconButton>

            <div
                onClick={onToggle}
                className={classNames(styles.reportHeaderDate, {
                    [styles.reportHeaderDateExpanded]: isOpen
                })}
            >
                {isOpen && month ? month : beautifyDate(date)}
            </div>

            <IconButton onClick={() => alert('Будут настройки')}>
                <SettingsIcon />
            </IconButton>
        </div>
    );
};

type ContentProps = {
    date: Date | null;
    setMonth: React.Dispatch<React.SetStateAction<string | null>>;
};

const Content: FC<ContentProps> = ({ date, setMonth }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();

    const handleDateChange = (date: Date | null) => {
        if (!date) return;

        if (params && searchParams) {
            const queryParams = new URLSearchParams({
                date: searchParams.get('date') ?? '',
                steps: searchParams.get('steps') ?? '',
                weight: searchParams.get('weight') ?? ''
            });

            const formattedDate = formatDate(date);
            queryParams.set('date', formattedDate);

            router.push(`/report/${params?.userId}?${queryParams}`);
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
    const searchParams = useSearchParams();

    const [month, setMonth] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (searchParams && searchParams.has('date')) {
            const queryDate = searchParams.get('date') ?? '';
            const parsedDate = parseDate(queryDate);

            setDate(parsedDate);
        }
    }, [searchParams]);

    return (
        <header className={styles.reportHeader}>
            <Accordion>
                <Accordion.Header>
                    <Header date={date} month={month} />
                </Accordion.Header>
                <Accordion.Content>
                    <Content date={date} setMonth={setMonth} />
                </Accordion.Content>
            </Accordion>
        </header>
    );
};

export default ReportHeader;
