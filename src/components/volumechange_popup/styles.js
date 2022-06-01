import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    overlay : {
        width: '100%',
        height : '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 99,
    },
    lottie: {
        width: 100,
        height: 100
    },
    sliderholder : {
        width : '90%', 
        height : 80, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Colors.white,
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 15,
        borderRadius : 15
    },
    text : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.white,
        fontSize : 12,
        marginTop : 15
    }
})

export default styles;