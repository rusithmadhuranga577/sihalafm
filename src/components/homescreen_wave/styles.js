import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    wave: {
        width: width,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    waveBall: {
        width: width,
        borderRadius: 50,
        overflow: 'hidden',
    }
});

export default styles;