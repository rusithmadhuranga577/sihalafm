import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent : 'center',
    },
    buttoncontainer : {
        width : (width/2)-10,
        height : (width/2)-130,
        borderRadius : 10,
        elevation : 10,
        alignSelf : 'center',
        backgroundColor : Colors.homescreen_button_background,
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center',
        padding : 5
    },
    buttontitle : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 15,
        color : Colors.white,
        fontWeight : 'bold',
        width : '70%'
    },
    iconstyle : {
        height : (width/2)-160,
        width : 40,
        marginRight : 10
    }
});

export default styles;