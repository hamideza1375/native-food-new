import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Badge = ({ color, text, top, left, right, bottom, style }) => {
    return (
        <View style={[styles.viewBadge, {
            backgroundColor: color ?
                (color == 'red') && '#f33' ||
                (color == 'blue') && '#22f' ||
                (color == 'green') && '#292' ||
                (color == 'yellow') && '#fa3' ||
                (color == 'black') && '#555' ||
                color
                :
                "#f33",
        },
        { top: top, left: left, right: right, bottom: bottom }, style]} >
            <Text style={styles.textBadge} >
                {text}
            </Text>
        </View>
    )
}

export default Badge
const styles = StyleSheet.create({
    textBadge: {
        color: 'white',
        fontSize: 12.6,
        fontWeight: '900',
    },
    viewBadge: {
        width: 15,
        height: 15,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
    },
})