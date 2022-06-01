import React from "react";
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart';
import { UserData } from '@components';

class GoogleLogin extends React.Component {

    componentDidMount(){
    }

    signIn = async () => {
        console.log('Sign In');
        GoogleSignin.configure({
            webClientId: '945038255973-b9lfou1invbpu9g7qag205od7id9ogfd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            profileImageSize: 300, 
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().signInWithCredential(googleCredential);
            this.getUserinfofromFirebase(userInfo.user.id, userInfo.user, userInfo.idToken);
        } catch (error) {
            console.log(error);
            alert(error)
        }
    };

    getUserinfofromFirebase = async (id, userInfo, access_token) => {
        console.log(id)
        const user = await firestore()
        .collection('users')
        .doc(id.toString())
        .get();
        
        if(user._exists){
            UserData.saveLoginDataAlreadyRegisterdUser(user._data);
        }else{
            this.createNewAccount(id, userInfo, access_token);
        }
    }

    createNewAccount = async (id, userInfo, access_token) => {
        const name = `${userInfo.givenName} ${userInfo.familyName}`
        const user = await firestore()
        .collection('users')
        .doc(id.toString())
        .set({
            user_id: id,
            access_token: access_token,
            user_email: userInfo.email,
            user_name : name,
            user_photo : userInfo.photo,
            first_name : userInfo.givenName
        })
        .then(() => {
            UserData.saveLoginDataNewUser(userInfo);
        });
    }

    signOut = async () => {
        GoogleSignin.configure({
            webClientId: '945038255973-b9lfou1invbpu9g7qag205od7id9ogfd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            profileImageSize: 300, 
        });
        try {
            await GoogleSignin.signOut();
            UserData.removeLoginData();
          } catch (error) {
            console.error(error);
        }
    }


}

const ExportFunction = new GoogleLogin;

export default ExportFunction;