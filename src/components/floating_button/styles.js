import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    buttoncontainer: {
        paddingHorizontal : 15,
        paddingVertical : 5,
        borderRadius : 20,
        backgroundColor : Colors.secondary,
        position : 'absolute',
        bottom : 40,
        right : 20
    },
    title: {
        fontFamily : Constants.sinhalFont,
        fontWeight : 'bold',
        color : Colors.white,
        fontSize : 15
    },
});

export default styles;