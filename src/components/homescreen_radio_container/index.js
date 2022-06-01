import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import styles from './styles';
import { Images, Languages } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlayer from 'react-native-sound-player'
import MusicControl, {Command} from 'react-native-music-control'
import { Pulse } from 'react-native-loader';
import { BackgroundPlayService } from '@services';
import BackgroundService from 'react-native-background-actions';

const width = Dimensions.get('screen').width;

export default class HomeScreenRadioContainer extends React.Component {

    _onFinishedPlayingSubscription = null
    _onFinishedLoadingURLSubscription = null

    constructor(props) {
        super(props);
        this.state = {
            is_playing : false,
            loading : false
        };
    }

    componentDidMount(){
        console.log(BackgroundService.isRunning())
        this.setState({is_playing : BackgroundService.isRunning()})
        this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            this.pauseRadio();
        })
        this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            this.setState({loading : false});
        })

        MusicControl.on(Command.play, ()=> {
            this.onButtonPress();
        })
        
        MusicControl.on(Command.pause, ()=> {
            this.onButtonPress();
        })

        MusicControl.on(Command.stop, ()=> {
            SoundPlayer.stop();
        })
    }

    onButtonPress(){
        const state = this.state.is_playing;
        this.setState({is_playing : !state});
        if(state){
            BackgroundPlayService.stop();
        }else{
            BackgroundPlayService.start();
            this.setState({loading : true});
        }
    }

    componentWillUnmount() {
        this._onFinishedPlayingSubscription.remove();
        this._onFinishedLoadingURLSubscription.remove();
    }

    renderLogo(){
        return(
            <Image style={[styles.logoimage]} source={Images.AppIcon}/>
        );
    }

    renderOnAirText(){
        return(
            <View style={[styles.onaricontainer, {backgroundColor : this.props.onAir ? 'red' : 'black'}]}>
                <Text style={[styles.onair, {color : 'white'}]}>{Languages.OnAir}</Text>
            </View>
        );
    }

    renderPlayButton(){
        const state = this.state.is_playing;
        const loading = this.state.loading;
        return(
            <>
            {loading ? 
                <Pulse size={10} color="#52AB42" /> 
            :
                <TouchableOpacity onPress={()=>this.onButtonPress()} style={[styles.playbuttoncontainer]}>
                    <Icon name={state ? 'stop' : 'play'} size={30} color={'black'}/>
                </TouchableOpacity>
            }
            </>
        );
    }

    renderRadioContainer(){
        return(
            <View style={[styles.container]}>
                <View style={[styles.rowcontainer]}>
                    {this.renderLogo()}
                    <View style={{alignItems : 'center', justifyContent : 'center', width : '50%'}}>
                        {this.renderOnAirText()}
                        <Text style={[styles.ongoingmusic]}>Sihala FM</Text>
                        {this.renderPlayButton()}
                    </View>
                </View>
            </View>
        );
    }

    render(){
        return(
            <>
            {this.renderRadioContainer()}
            </>
        );
    }
}