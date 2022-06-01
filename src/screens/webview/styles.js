import { StyleSheet, StatusBar } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.backgroundgray,
    },
    webviewcontainer : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.backgroundgray,
        marginTop : 60+StatusBar.currentHeight
    },
    topappbarcontainer : {
        width : '100%',
        height : 60,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        backgroundColor : Colors.white,
        position: 'absolute',
        top : StatusBar.currentHeight,
        alignItems : 'center',
    },
    bgimage : {
        width : '100%',
        height : '100%',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        alignSelf : 'center'
    },
    bgimagestyle : {
        width : '100%',
        height : '100%',
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        alignSelf : 'center',
    },
    title : {
        fontFamily : Constants.sinhalaFont,
        fontSize : 15,
        color : Colors.white,
        fontWeight : 'bold'
    }
})

export default styles;