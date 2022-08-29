import React from 'react'
import { Platform, Animated } from 'react-native';
import { state } from "./state/utils/contexts";
import { NativeModules } from 'react-native';

const Layout = (props) => {
    const { StatusBarManager } = NativeModules;
    const { allState } = state()

    return (
        <Animated.View style={[ Platform.OS === 'ios' ? allState.width < allState.height ? { paddingTop: StatusBarManager.HEIGHT, flex: 1 } : { paddingHorizontal: StatusBarManager.HEIGHT / 1.7, paddingTop: 10, flex: 1 } : { flex: 1 }]} >
            {props.children}
        </Animated.View>
    )
}

export default Layout