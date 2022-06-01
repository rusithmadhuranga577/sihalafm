import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 20,
        fontWeight : 'bold',
        color : Colors.white,
        position: 'absolute',
        bottom : 10
    },
    logo : {
        width : (width/1.5),
        height : (width/1.5),
        alignSelf : 'center'
    },
    progressbarcontainer : {
        width : width,
        position : 'absolute',
        top : -5
    }
});

export default styles;