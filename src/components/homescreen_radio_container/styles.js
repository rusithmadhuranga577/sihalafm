import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        width: width-10,
        justifyContent : 'center',
        borderRadius : 15,
        backgroundColor : Colors.radiocontainerbackground,
        alignSelf : 'center'
    },
    rowcontainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    logoimage : {
        width : (width/2),
        height :  (width/2),
        borderRadius : 25
    },
    onair : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 18,
        color : Colors.white,
        fontWeight : 'bold'
    },
    onaricontainer : {
        paddingHorizontal : 15,
        paddingVertical : 5,
        borderRadius : 10,
        backgroundColor : 'red'
    },
    playbuttoncontainer : {
        width : (width/4)-30,
        height : (width/4)-30,
        borderRadius : 100,
        backgroundColor : Colors.white,
        marginTop : 10,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 10
    },
    ongoingmusic : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 15,
        color : Colors.white,
        fontWeight : 'bold',
        marginVertical : 8
    }
});

export default styles;