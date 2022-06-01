import React from 'react';
import {createStackNavigator, HeaderTitle, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { Constants } from '@common';

import { Splash } from '@screens';
import { Home } from '@screens';
import { WebviewPage } from '@screens';
import { LoadingScreen } from '@screens';

export default class Navigator extends React.Component {
    
    render(){
        const Stack = createStackNavigator();
        return(
            <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { height: 50, elevation: 10} ,
                headerBackTitleVisible: false,
                animationEnabled : true,
                ...TransitionPresets.SlideFromRightIOS ,
                headerTitleStyle : {fontSize : 18, width : '100%', alignSelf : 'center', fontFamily : Constants.sinhalaFont},
                // headerBackImage: ()=>(<Back/>),
            }}
            >
                <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
                <Stack.Screen name="WebviewPage" component={WebviewPage} options={{headerShown : false}}/>
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerShown : false}}/>
            </Stack.Navigator>
            </NavigationContainer>
        );
    }
}