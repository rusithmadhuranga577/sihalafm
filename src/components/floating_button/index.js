import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Languages } from '@common';
import styles from './styles';

const width = Dimensions.get('screen').width;

class HomeScreenFloationgButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }
    
    render(){
        return(
            <TouchableOpacity onPress={this.props.action} style={[styles.buttoncontainer]}>
                <Text style={[styles.title]}>{Languages.LiveChat}</Text>
            </TouchableOpacity>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <HomeScreenFloationgButton {...props} navigation={navigation} />;
} 