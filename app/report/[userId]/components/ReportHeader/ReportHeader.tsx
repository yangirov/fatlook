'use client';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import DatePicker from '@/shared/ui/DatePicker';
import { Accordion, AccordionContext, IconButton } from '@/shared/ui';
import { ArrowIcon } from '@/shared/icons';
import { beautifyDate, formatDate, parseDate } from '@/shared/utils';

import { ReportContext } from '../../Report';

import styles from './ReportHeader.module.scss';

type HeaderProps = {
    date: Date | null;
    month: string | null;
    headerRef: React.MutableRefObject<HTMLElement | null>;
};

const Header: FC<HeaderProps> = ({ date, month, headerRef }) => {
    const {
        report: { name }
    } = useContext(ReportContext);

    const { isOpen, setOpen } = useContext(AccordionContext);

    const onToggle = () => {
        setOpen(prev => !prev);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (isOpen && e.target instanceof HTMLElement && !headerRef?.current?.contains(e.target)) {
            onToggle();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div className={styles.reportHeaderControls}>
            <div className={styles.reportHeaderBack}>
                <IconButton href="/">
                    <ArrowIcon />
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

            <div className={styles.reportHeaderUser}>{name}</div>
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
    const headerRef = useRef(null);
    const searchParams = useSearchParams();

    const [month, setMonth] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (searchParams && searchParams.has('date')) {
            const queryDate = searchParams.get('date') ?? '';
            const parsedDate = parseDate(queryDate);

            setDate(parsedDate);
        }
    }, [searchParams]);

    const onChange = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <header className={styles.reportHeader} ref={headerRef}>
                <Accordion onChange={onChange}>
                    <Accordion.Header>
                        <Header date={date} month={month} headerRef={headerRef} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Content date={date} setMonth={setMonth} />
                    </Accordion.Content>
                </Accordion>
            </header>
            <div className={classNames(styles.overlay, { [styles.overlayOpened]: isOpen })}></div>
        </>
    );
};

export default ReportHeader;
