import React, { ReactNode } from 'react';

import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from 'react-native';

type HOCProps = {
    children?: ReactNode;
} & ViewProps;

const DismissKeyboardHOC = (Comp: typeof View) => {
    const hoc = ({ children, ...props }: HOCProps) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Comp {...props}>{children}</Comp>
        </TouchableWithoutFeedback>
    );

    hoc.displayName = 'DismissKeyboardHOC';
    return hoc;
};

export const DismissKeyboardView = DismissKeyboardHOC(View);
