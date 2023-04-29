import { ComponentPropsWithoutRef, FC } from 'react';

import { SemanticallyHidden, CurveDefaultsConfig, CurveDefaults, Colorable, ColorDefault } from './types';

import styles from './Icon.module.scss';

type IconContainerProps = ComponentPropsWithoutRef<'svg'> & SemanticallyHidden;

const IconContainer: FC<IconContainerProps> = ({ className, ...propsRest }) => {
    return (
        <div className={styles.icon}>
            <svg className={className} {...propsRest} />
        </div>
    );
};

const createCurveDefaults = ({ color = 'var(--white)', width, height, viewBox }: CurveDefaultsConfig): CurveDefaults => ({
    color,
    width: width.toString(),
    height: height.toString(),
    viewBox: viewBox ?? `0 0 ${width} ${height}`
});

type IconProps<CP = Colorable> = Omit<CP & ColorDefault & IconContainerProps, 'children'>;

export const asIcon = (Curve: FC<Colorable>, defaultsConfig: CurveDefaultsConfig): FC<IconProps> => {
    const defaults = createCurveDefaults(defaultsConfig);

    const WrappedCurve: FC<IconProps> = ({
        color,
        viewBox,
        width,
        height,
        isSemanticallyHidden: isSemanticallyHidden = true,
        noDefaultColor = false,
        'aria-hidden': ariaHidden = true,
        ...propsRest
    }) => (
        <IconContainer
            {...propsRest}
            viewBox={viewBox ?? defaults.viewBox}
            width={width ?? defaults.width}
            height={height ?? defaults.height}
            aria-hidden={isSemanticallyHidden ? ariaHidden : undefined}
        >
            <Curve color={noDefaultColor || color ? color : defaults.color} />
        </IconContainer>
    );

    WrappedCurve.displayName = `asIcon(${Curve.displayName ?? Curve.name})`;

    return WrappedCurve;
};
