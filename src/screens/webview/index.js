/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, ImageBackground, Text, Share, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { LoadingComponent } from '@components';
import { Images, Colors } from '@common';
import { WebView } from 'react-native-webview';

const WebviewPage =({route}) => {

  const {url} = route.params;
  const {title} = route.params;
  const webviewRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [activeUrl, setactiveUrl] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction, backButtonHandler);
    return () =>{
      BackHandler.removeEventListener("hardwareBackPress",backAction, backButtonHandler);
    }
  });

  const backAction = () => {
    backButtonHandler();
    return true;
  };

  const backButtonHandler = () => {
    if(canGoBack){
      console.log(canGoBack);
      webviewRef.current.goBack()
    }else{
      console.log(canGoBack);
      navigation.goBack();
    }
  }

  const shareFunction = async () => {
    try {
      const result = await Share.share({
        message:
          `${activeUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType)
        } else {
          // shared
        }
      } 
    } catch (error) {
      alert(error.message);
    }
  }

  const TopAppBar = () => {
    return(
      <View style={[styles.topappbarcontainer]}>
        <ImageBackground style={[styles.bgimage]} source={Images.AppBarBack} imageStyle={[styles.bgimagestyle]}>
          <TouchableOpacity onPress={backAction}>
            <Icon name={'arrow-back'} size={25} color={Colors.white} style={{marginLeft : 10}}/>
          </TouchableOpacity>
          <Text style={[styles.title]}>{title}</Text>
          <TouchableOpacity onPress={shareFunction}>
            <Icon name={'share-social'} size={25} color={Colors.white} style={{marginRight : 10}}/>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  return(
    <View style={[styles.container]}>
      <LoadingComponent visibility={loading}/>
      <WebView 
        source={{ uri: url }} 
        ref={webviewRef}
        style={[styles.webviewcontainer]}
        onLoadStart={() => {setloading(true);}}
        onLoadEnd={() => {setloading(false);}}
        onNavigationStateChange={(navState) => {
          setactiveUrl(navState.url);
          setCanGoBack(navState.canGoBack);
        }}
      />
      <TopAppBar/>
    </View>
  );
}
export default WebviewPage;