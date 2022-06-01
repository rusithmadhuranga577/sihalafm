import React from 'react';
import {
  View,
  Text,
  Image,
  ProgressBarAndroid,
  StatusBar
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Images, Colors, Config } from '@common';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends React.Component {

    componentDidMount(){
        this.navigationFunction();
    }

    navigationFunction(){
        this.getDataFromServer();
    }

    getDataFromServer = () => {
        const { navigation } = this.props;

        fetch(Config.initialdataUrl)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.url);
            AsyncStorage.setItem('streaming_url', json.url);
            navigation.replace('Home', {onAirState : json.on_air});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
            <LinearGradient 
                end={{x: 0.0, y: 0.25}} start={{x: 0.5, y: 1.0}}
                colors={['#000000', '#000625']} 
                style={[styles.container]}
            >
                <Image source={Images.AppIcon} style={[styles.logo]}/>
                <Text style={[styles.text]}>සිහල FM</Text>
                <View style={[styles.progressbarcontainer, {top : StatusBar.currentHeight-5}]}>
                    <ProgressBarAndroid styleAttr='Horizontal' color={Colors.white}/>
                </View>
                <StatusBar backgroundColor={'#000625'} hidden={false} translucent={true}/>
            </LinearGradient>
        );
    }
}
export default function(props){
    const navigation = useNavigation();
    return <Splash {...props} navigation={navigation} />;
} 