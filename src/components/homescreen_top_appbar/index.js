import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import moment from 'moment';
import styles from './styles';
import { GoogleLogin } from '@components';
import { Languages, Images, Colors } from '@common'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { ContextMenu, SlideInMenu, Popover } = renderers;

class HomeScreenTopAppBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            greeringtext : Languages.GoodMorning,
            logged : true,
            has_photo : false,
            photo : '',
            renderer: ContextMenu,
            name : '',
            array : ''
        };

    }

    componentDidMount(){
        const { navigation } = this.props;
        const unsubscribe = navigation.addListener('focus', () => {
            this.getSavedData();
            this.getGreetingTime();
        });

        this.getSavedData()
        this.getGreetingTime();
    
        return unsubscribe;
    }

    getSavedData = () => {
        AsyncStorage.getItem('logged', (err, value)=>{
            if(value == 'true'){
                this.setState({logged : true});
            }else{
                this.setState({logged : false});
            }
        })
        AsyncStorage.getItem('photo', (err, value)=>{
            if(value == null || value == ''){
                this.setState({has_photo : false});
                this.setState({photo : Images.UserPlaceholder});
            }else{
                this.setState({has_photo : true});
                this.setState({photo : value});
            }
        })
        AsyncStorage.getItem('first_name', (err, value)=>{
            this.setState({name : value});
        })
    }

    getGreetingTime = () => {
        var today = new Date()
        var curHr = today.getHours()
        var currentHour = moment(curHr, "H").format("HH");
    
        if (currentHour < 12) {
            this.setState({greeringtext : Languages.GoodMorning})
        } else if (curHr < 18) {
            this.setState({greeringtext : Languages.GoodAfternoon})
        } else {
            this.setState({greeringtext : Languages.GoodAfternoon})
        }
    }

    renderTopAppBar(){
        const logged = this.state.logged;
        return(
            <View style={[styles.container]}>
                <View style={{width: '80%',}}>
                    <Text numberOfLines={1} style={[styles.title]}>{this.state.greeringtext}, {this.state.name}</Text>
                </View>
                <Menu 
                    ref={r => (this.menu = r)}
                    renderer={this.state.renderer}
                    rendererProps={{ anchorStyle: styles.anchorStyle }}
                    style={{ height: 50 }}
                >
                <MenuTrigger 
                    children={this.state.has_photo ?
                                <>
                                    <Image source={{uri : this.state.photo}} style={styles.placeholderimage}/>
                                </>
                                :
                                    <Image source={Images.UserPlaceholder} style={styles.placeholderimage}/>
                            }
                />
                <MenuOptions customStyles={optionsStyles}>
                    {logged ? null :
                        <MenuOption onSelect={() => this.login()}>
                            {this.renderOptionButton(Languages.SignIn, 'logo-google')}
                        </MenuOption>
                    }
                    <MenuOption onSelect={() => this.props.showVolumeController()}>
                        {this.renderOptionButton(Languages.Volume, 'volume-high-outline')}
                    </MenuOption>
                    {logged ? 
                        <MenuOption onSelect={() => GoogleLogin.signOut()}>
                            {this.renderOptionButton(Languages.Logout, 'log-out-outline')}
                        </MenuOption> : null
                    }
                </MenuOptions>
                </Menu>
            </View>
        );
    }

    login = async () => {
        // GoogleLogin.signIn();
        console.log(GoogleLogin.signIn());
    }

    renderOptionButton = (title, icon) => {
        return(
            <View style={[styles.buttonrow]}>
                <Icon name={icon} size={12} color={Colors.black}/>
                <View style={{justifyContent : 'flex-start'}}>
                    <Text style={[styles.buttontext]}>{title}</Text>
                </View>
            </View>
        );
    }

    render(){
        return(
            <>
            {this.renderTopAppBar()}
            </>
        );
    }
}

const optionsStyles = {
    optionsContainer: {
      backgroundColor: Colors.white,
      padding: 5,
      borderRadius : 10,
      marginRight : 15
    },
    optionWrapper: {
      margin: 5,
      marginRight : 15
    },
    optionTouchable: {
      underlayColor: 'gold',
      activeOpacity: 70,
      marginRight : 15
    },
    optionText: {
      color: 'brown',
    },
  };

export default function(props){
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    return <HomeScreenTopAppBar {...props} navigation={navigation} isFocused={isFocused}/>;
} 