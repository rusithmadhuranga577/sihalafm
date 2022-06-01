import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import styles from "./styles";

class LoadingScreen extends React.Component {

    componentDidMount(){
        
    }

    render(){
        return(
            <View style={[styles.container]}></View>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <LoadingScreen {...props} navigation={navigation} />;
} 