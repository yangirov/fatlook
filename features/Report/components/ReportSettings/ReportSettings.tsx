import { FC, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { Divider, Icon, Modal } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { PartialFoodDetailsKeys, FoodDetails, foodKeysMap } from '@/shared/types';
import { changeColumns } from '@/shared/store/reportReducer';

import styles from './ReportSettings.module.scss';

type ReportSettingsProps = {
    isOpen: boolean;
    onToggle: () => void;
};

const allColumns: PartialFoodDetailsKeys = [
    'allFat',
    'fat',
    'nonSaturatedFat',
    'carbohydrates',
    'fiber',
    'sugar',
    'protein',
    'sodium',
    'cholesterol',
    'kalium',
];

export const ReportSettings: FC<ReportSettingsProps> = ({ isOpen, onToggle }) => {
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const visibleColumns = useAppSelector(state => state.report.visibleColumns);

    const saveColumn = (key: Partial<keyof FoodDetails>) => {
        const maxColumns = 6;
        const columnsCount = visibleColumns.length;

        setError(null);

        if (visibleColumns.includes(key)) {
            dispatch(changeColumns(key));
        } else if (columnsCount < maxColumns) {
            dispatch(changeColumns(key));
        } else {
            setError(`Можно выбрать до ${maxColumns} колонок`);
        }
    };

    return (
        <Modal isOpen={isOpen} onToggle={onToggle}>
            <div className={styles.reportSettings}>
                <div className={styles.reportSettingsTitle}>Отображаемые колонки</div>
                <div className={styles.reportSettingsError}>{error}</div>

                {allColumns.map((key, index) => (
                    <div key={key}>
                        <div className={styles.column} onClick={() => saveColumn(key)}>
                            <div className={styles.columnName}>{foodKeysMap[key]?.fullName}</div>
                            <div className={styles.columnCheckbox}>
                                <Icon color={visibleColumns.includes(key) ? 'var(--green)' : 'var(--light-gray)'}>
                                    <FaCheck />
                                </Icon>
                            </div>
                        </div>
                        {allColumns.length - 1 !== index && <Divider />}
                    </div>
                ))}
            </div>
        </Modal>
    );
};
