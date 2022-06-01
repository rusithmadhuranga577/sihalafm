/** @format */

import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import styles from './styles';
import { Images, Languages } from '@common';

class NoInternet extends React.Component {

    openSettings = () => {
        Platform.OS === 'ios'
            ? Linking.openURL('App-prefs:root=MOBILE_DATA_SETTINGS_ID')
            : AndroidOpenSettings.wirelessSettings();
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Image source={Images.NoInternet} style={[styles.image]}/>
                <Text style={[styles.titletext]}>{Languages.NoInternetTitle}</Text>
                <Text style={[styles.subtitletext]}>{Languages.NoInternetSubtitle}</Text>
                <TouchableOpacity onPress={this.openSettings} style={[styles.button]}>
                    <Text style={[styles.buttontitle]}>{Languages.GoToSettings}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
export default NoInternet;