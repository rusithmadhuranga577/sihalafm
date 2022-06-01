import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        width : width,
        height : 60,
        alignItems : 'center',
        paddingLeft : 15,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 20,
        width : '100%'
    },
    title : {
        fontFamily : Constants.sinhalaFont,
        fontWeight : 'bold',
        fontSize : 20,
        color : Colors.white,
        width : '95%'
    },
    usericoncontainer : {
        width : 40, 
        height : 40, 
        backgroundColor : Colors.darkgray,
        borderRadius : 100,
        marginRight : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    placeholderimage : {
        width : 40, 
        height : 40, 
        borderRadius : 100,
    },
    anchorStyle: {
        backgroundColor: 'blue',
    },

    // Popup menu styles
    optionsContainer: {
        backgroundColor: Colors,
        padding: 5,
        borderRadius : 10
    },
    optionsWrapper: {
        backgroundColor: 'purple',
    },
    optionWrapper: {
        backgroundColor: 'yellow',
        margin: 5,
    },
    optionTouchable: {
        underlayColor: 'gold',
        activeOpacity: 70,
    },
    optionText: {
        color: 'brown',
    },
    buttontext : {
        fontSize : 10,
        color : Colors.black,
        marginLeft : 10
    },
    buttonrow : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        alignSelf : 'flex-start',
    }
});

export default styles;