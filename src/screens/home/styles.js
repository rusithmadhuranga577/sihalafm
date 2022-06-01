import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.primary,
        height : '100%',
        zIndex: 100,
    },
    text : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 45,
        fontWeight : 'bold'
    },
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
    },
    subtitle : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 15,
        fontWeight : 'bold',
        color : Colors.white,
        alignSelf : 'center',
        marginBottom : 20,
        marginTop : 20,
        textAlign : 'center'
    },
    bottomimage : {
        width: '100%',
        position : 'absolute',
        height : 160,
        bottom : 0,
        opacity : 0.5,
    },
    drawercontainer : {
        width: '100%',
        position : 'absolute',
        bottom : 0
    },
    box: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    boxWrapper: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default styles;