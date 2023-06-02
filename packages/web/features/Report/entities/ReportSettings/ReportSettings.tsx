import { FC, useState } from 'react';

import { FaCheck } from 'react-icons/fa';

import { PartialFoodDetailsKeys, FoodDetails, foodKeysMap } from '@fatlook/core/types';

import { useAppDispatch, useAppSelector } from '@/web/shared/store';
import { changeColumns } from '@/web/shared/store/reportReducer';
import { Divider, Icon, Modal } from '@/web/shared/ui';

import styles from './ReportSettings.module.scss';

type ReportSettingsProps = {
    isOpen: boolean;
    onToggle: () => void;
};

const allColumns: PartialFoodDetailsKeys = [
    'allFat',
    'fat',
    'saturatedFat',
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
            <Modal.Title>Отображаемые колонки</Modal.Title>

            <Modal.Content>
                <div className={styles.reportSettingsError}>{error}</div>

                {allColumns.map((key, index) => (
                    <div key={key}>
                        <div className={styles.column} onClick={() => saveColumn(key)}>
                            <div>{foodKeysMap[key]?.fullName}</div>
                            <div className={styles.columnCheckbox}>
                                <Icon color={visibleColumns.includes(key) ? 'var(--green)' : 'var(--light-gray)'}>
                                    <FaCheck />
                                </Icon>
                            </div>
                        </div>
                        {allColumns.length - 1 !== index && <Divider />}
                    </div>
                ))}
            </Modal.Content>
        </Modal>
    );
};
