import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Config } from '@common';
import { FlatGrid } from 'react-native-super-grid';

const width = Dimensions.get('screen').width;

class HomeScreenButtonContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
    }

    buttonContainer(item){
        return(
            <TouchableOpacity onPress={()=>this.onButtonPressed(item.url, item.name)} style={[styles.buttoncontainer]}>
                <Image source={item.icon} style={[styles.iconstyle]}/>
                <Text numberOfLines={2} style={[styles.buttontitle]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderButtonGridContainer(){
        return(
            <View>
                <FlatGrid
                    itemDimension={130} 
                    data={Config.HomeScreenButonGrid}
                    renderItem={({ item }) => this.buttonContainer(item)}
                />
            </View>
        );
    }

    onButtonPressed(url, name){
        const {navigation} = this.props;

        navigation.push('WebviewPage', {url : url, title : name});
    }
    
    render(){
        return(
            <>
            {this.renderButtonGridContainer()}
            </>
        );
    }
}

export default function(props){
    const navigation = useNavigation();
    return <HomeScreenButtonContainer {...props} navigation={navigation} />;
} 