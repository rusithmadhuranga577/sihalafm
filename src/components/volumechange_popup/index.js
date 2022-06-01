import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import VolumeControl, { VolumeControlEvents } from "react-native-volume-control";
import Slider from '@react-native-community/slider';
import { Colors, Icons } from '@common';

export default class VolumeChanger extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            volume : 0,
            show_slider : false
        };
    }

    async componentDidMount() {
        this.setState({
          volume: await VolumeControl.getVolume()
        });
     
        this.volEvent = VolumeControlEvents.addListener(
          "VolumeChanged",
          this.volumeEvent
        );

        setTimeout(() => {
            this.setState({show_slider : true});
        }, 100);

        console.log(this.state.volume)
      }
     
    volumeEvent = event => {
        this.setState({ volume: event.volume });
    };
     
    sliderChange(value) {
        VolumeControl.change(value);
    }
     
    componentWillUnmount() {
        this.volEvent.remove();
    }

    onVolumeUpPressed = () => {
        const now_volume = this.state.volume;
        var v = now_volume;

        if(now_volume < 1){
            v = now_volume+0.2;
            this.setState({volume : v});
            console.log(now_volume)
            VolumeControl.change(v);
        }
    }

    onVolumeDownPressed = () => {
        const now_volume = this.state.volume;
        var v = now_volume;

        if(now_volume > 0){
            v = now_volume-0.2;
            this.setState({volume : v});
            console.log(now_volume)
            VolumeControl.change(v);
        }else{
            this.setState({volume : 0});
        }
    }

    render(){
        return (
            <Modal
                visibility={this.props.visibility}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.closeContainer()} style={[styles.overlay]}>
                    <View style={[styles.sliderholder]}>
                    <TouchableOpacity onPress={()=>this.onVolumeDownPressed()}>
                        <Icon name={'volume-low'} size={25} color={this.state.volume == 0 ? Colors.gray : Colors.black}/>
                    </TouchableOpacity>
                    {
                        this.state.show_slider ?
                        <Slider
                            key={2}
                            style={{width : '70%'}}
                            value={this.state.volume}
                            onValueChange={(value)=>this.sliderChange(value)}
                            thumbTintColor={Colors.primary}
                            minimumTrackTintColor={Colors.secondary}
                        /> : null
                    }
                    <TouchableOpacity onPress={()=>this.onVolumeUpPressed()}>
                        <Icon name={'volume-high'} size={25} color={this.state.volume == 1 ? Colors.gray : Colors.black}/>
                    </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            );
        }
    }