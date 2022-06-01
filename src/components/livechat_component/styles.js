import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container : {
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        height: 500,
    },
    handlecontainer : {
        width: '100%',
        backgroundColor: Colors.secondary,
        height: 60,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
    },
    bottomsheettitle : {
        fontSize : 18,
        fontWeight : 'bold',
        color : Colors.white,
        alignSelf : 'center'
    },
    chatbubblecontainer : {
        paddingHorizontal : 20,
        paddingVertical : 10,
        backgroundColor : 'gray',
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 0,
        borderTopLeftRadius : 20,
        borderBottomRightRadius : 20,
        marginTop : 8,
        marginBottom : 3,
        marginLeft : 10,
        maxWidth : '80%'
    },
    chatbubblecontainer_admin : {
        paddingHorizontal : 20,
        paddingVertical : 10,
        backgroundColor : '#ff6161',
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 20,
        borderTopLeftRadius : 20,
        borderBottomRightRadius : 0,
        marginTop : 8,
        marginBottom : 3,
        marginRight : 10,
        maxWidth : '80%'
    },
    messagetext : {
        fontSize : 13,
        color : Colors.white,
        fontWeight : 'bold'
    },
    usernametext : {
        fontSize : 10,
        color : Colors.white,
        fontWeight : 'bold',
        marginBottom : 5,
        marginRight : 10
    },
    timetext : {
        fontSize : 10,
        color : '#d1d1d1',
        fontWeight : 'bold',
        marginLeft : 15,
        marginRight : 15,
        marginBottom : 10,
    },
    textinput : {
        width : width/1.15,
        borderRadius : 30,
        height : width-(width/1.1),
        backgroundColor : Colors.textinputbg,
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10,
        color : Colors.white,
        fontSize : 12,
        fontWeight : 'bold',
        paddingLeft : 25,
        marginLeft : 10
    },
    textinputcontainer : {
        width : '100%',
        backgroundColor : Colors.black,
        position: 'absolute',
        bottom : -20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingBottom : 30
    },
    iconholder : {
        width : width-(width/1.1),
        height : width-(width/1.1),
        borderRadius : 100,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : 10
    },
    signintext : {
        fontSize : 15,
        color : Colors.white,
        fontWeight : 'bold',
        marginTop : 20,
        marginBottom : 10
    },
    logintextcontainer : {
        width : '100%',
        backgroundColor : Colors.black,
        position: 'absolute',
        bottom : -20,
        justifyContent : 'center',
        alignItems : 'center',
    },
    loginbuttonstyle : {
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 15,
        backgroundColor : Colors.secondary,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : 25
    },
    logintext : {
        fontSize : 15,
        color : Colors.white,
        fontWeight : 'bold',
    },
    scrolltobottombuttoncontainer : {
        width : 30,
        height : 30,
        borderRadius : 150,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom : 90,
        right: 20,
    },
    profilepicturecontainer : {
        width : 30,
        height : 30,
        borderRadius : 100,
        backgroundColor : Colors.homescreen_button_background
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    moreoptionsbutton : {
        padding : 5,
        borderRadius : 100,
        position : 'absolute',
        top : 5,
        right: 20
    },
    buttonrow : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        alignSelf : 'flex-start',
        width : '100%'
    },
    moreoptionbuttontext : {
        fontSize : 12,
        color : Colors.white,
        fontWeight : 'bold',
    }
})

export default styles;