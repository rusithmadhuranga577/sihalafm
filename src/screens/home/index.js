import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import styles from './styles';
import { Languages, Images } from '@common';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenTopAppBar, HomeScreenRadioContainer, HomeScreenButtonContainer, LiveChatComponent, VolumeChanger } from '@components';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_volume_controller : false,
            on_air : true
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const onAirState = this.props.route.params.onAirState;
        if(onAirState == 1){
            this.setState({on_air : true});
        }else{
            this.setState({on_air : false});
        }
        const unsubscribe = navigation.addListener('focus', () => {
            
        });
    
        return unsubscribe;
    }

    render(){
        return(
            <>
                <StatusBar backgroundColor={'#000625'} hidden={false} translucent={true}/>
                <LinearGradient 
                    end={{x: 0.0, y: 0.25}} start={{x: 0.5, y: 1.0}}
                    colors={['#000000', '#000625']} 
                    style={[styles.container]}
                >
                    <View style={{height : StatusBar.currentHeight}}/>
                    <HomeScreenTopAppBar showVolumeController={()=>this.setState({show_volume_controller : true})}/>
                    <Text style={[styles.subtitle]}>{Languages.HomeScreenSubTitle}</Text>
                    <HomeScreenRadioContainer onAir={this.state.on_air}/>
                    <HomeScreenButtonContainer/>
                    <View style={[styles.bottomimage]}>
                        <Image source={Images.HomeScreenBottom} style={[styles.bottomimage]}/>
                    </View>
                    {this.state.show_volume_controller ?
                    <VolumeChanger visibility={this.state.show_volume_controller} closeContainer={()=>this.setState({show_volume_controller : false})}/>
                    : null}
                    <LiveChatComponent/>
                </LinearGradient>
            </>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
} 