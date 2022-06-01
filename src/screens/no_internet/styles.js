import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent : 'center',
        alignItems : 'center'
    },
    image : {
        width : width/1.5,
        height : width/1.5
    },
    titletext : {
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
        marginTop : 20,
        color : Colors.black
    },
    subtitletext : {
        fontSize : 12,
        textAlign : 'center',
        width : '90%',
        marginTop : 8,
        color : Colors.darkgray
    },
    button : {
        paddingHorizontal : 20,
        paddingVertical : 10,
        backgroundColor : Colors.secondary,
        borderRadius : 20,
        elevation : 8,
        marginTop : 25,
    },
    buttontitle : {
        fontSize : 12,
        fontWeight : 'bold',
        color : Colors.white
    }
})

export default styles;