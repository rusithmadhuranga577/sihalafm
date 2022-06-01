import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height : '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: 100,
        height: 100
    },
    indicatorholder : {
        width : '45%', 
        height : 110, 
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10
    },
    text : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.white,
        fontSize : 12,
        marginTop : 15
    }
})

export default styles;