import React from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import styles from './styles';
import Wave from 'react-native-waveview';

const width = Dimensions.get('screen').width;

export default class HomeScreenWave extends React.Component {

    _waveRect = null;

    renderWaweAnimation(){
        return(
            <View style={{transform: [{rotate : `${180}deg`}]}}>
                <Wave
                    ref={ref=>this._waveRect = ref}
                    style={styles.wave}
                    H={50}
                    waveParams={[
                        {A: 30, T: width, fill: '#02304F'},
                        {A: 60, T: width, fill: '#62c2ff'},
                        {A: 45, T: width, fill: '#0087dc'},
                        {A: 30, T: width, fill: '#04619F'},
                    ]}
                    animated={true}
                    speed={5000}
                />
            </View>
        );
    }

    render(){
        return(
            <>
            {this.renderWaweAnimation()}
            </>
        );
    }
}