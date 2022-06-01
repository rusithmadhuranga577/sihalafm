import React from "react";
import { AsyncStorage } from 'react-native';
import { BackgroundPlayService } from '@services';
import RNRestart from 'react-native-restart';

class UserData extends React.Component {

    saveLoginDataAlreadyRegisterdUser = async (userInfo) => {
        await BackgroundPlayService.stop();
        const user = userInfo;
        const name = `${user.givenName} ${user.familyName}`
        AsyncStorage.setItem('user_id', user.user_id);
        AsyncStorage.setItem('first_name', user.first_name);
        AsyncStorage.setItem('user_name', user.user_name);
        AsyncStorage.setItem('email', user.user_email);
        AsyncStorage.setItem('photo', user.user_photo);
        AsyncStorage.setItem('logged', 'true');
        this.restart();
    }

    saveLoginDataNewUser = async (userInfo) => {
        await BackgroundPlayService.stop();
        const user = userInfo;
        const name = `${user.givenName} ${user.familyName}`
        AsyncStorage.setItem('user_id', user.id);
        AsyncStorage.setItem('first_name', user.givenName);
        AsyncStorage.setItem('user_name', name);
        AsyncStorage.setItem('email', user.email);
        AsyncStorage.setItem('photo', user.photo);
        AsyncStorage.setItem('logged', 'true');
        this.restart();
    }

    removeLoginData = () => {
        AsyncStorage.removeItem('user_id');
        AsyncStorage.removeItem('first_name');
        AsyncStorage.removeItem('user_name');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('photo');
        AsyncStorage.removeItem('logged');
        this.restart();
    }

    restart = () => {
        setTimeout(() => {
            RNRestart.Restart();
        }, 600);
    }

}

const ExportFunction = new UserData;

export default ExportFunction;