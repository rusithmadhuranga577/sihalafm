import React from 'react';
import {
  View,
  Dimensions,
  ToastAndroid,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Clipboard,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Languages, Images } from '@common';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import { HomeScreenFloationgButton, GoogleLogin } from '@components';
import firestore from '@react-native-firebase/firestore';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const snapPoints = [height-height, '70%',];
const { ContextMenu, SlideInMenu, Popover } = renderers;

class LiveChatComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_bottomsheet_open : false,
            typebox_text : '',
            chat_data : [],
            last_id : 0,
            logged : true,
            username : '',
            userid : '',
            photo : '',

            last_snapshot_size : 0,
            is_closed_to_bottom : true,

            renderer: ContextMenu 
        };
        this.flatListRef = React.createRef();
    }

    componentDidMount(){
        firestore().collection('live_chat').onSnapshot(this.onResult, this.onError);
        AsyncStorage.multiGet(['logged', 'user_name', 'photo', 'user_id'], (err, array)=>{
            console.log(array[3][1])
            if(array[0][1] == 'true'){
                this.setState({logged : true});
                this.setState({username : array[1][1]});
                this.setState({photo : array[2][1]});
                this.setState({userid : array[3][1]});
            }else{
                this.setState({logged : false});
            }
        })
    }

    getChatData = () => {
        firestore()
        .collection('live_chat')
        .orderBy('id', 'asc')
        .get()
        .then(querySnapshot => {
            this.setState({last_id: querySnapshot.size});
            const array = [];

            querySnapshot.forEach(documentSnapshot => {
                const data = documentSnapshot.data();
                array.push({id : data.id, name : data.user_name, time : data.timestamp, message : data.message, user_id : data.user_id, type : data.user_type, photo : data.user_profile_photo, show : data.show});
            });

            if(this.state.is_closed_to_bottom){
                try{
                    this.flatListRef.scrollToEnd({ animated: true })
                }catch(err){
                    console.log(err)
                }
            }

            this.setState({chat_data : array});
        });
    }

    onResult = (QuerySnapshot) => {
        this.getChatData();
    }
      
    onError = (error) => {
        console.error(error);
    }

    onOpenBottomSheetHandler = (index) => {
        this.refs.BottomSheet.snapTo(index);
    };

    onChangeBottomSheetSnap(data){
        var snap = data.index;
        if(snap == 1){
            this.setState({is_bottomsheet_open : true});
        }else if(snap == 0){
            this.setState({is_bottomsheet_open : false});
        }
    }

    sendMessage = () => {
        console.log(this.flatlistRef);
        const last_id = this.state.last_id;
        const new_id = last_id+1;
        var t = Math.floor(Date.now());
        var time = new Date(t);

        var hour = time.getHours();
        var minute = time.getMinutes();
        var day = time.getDate();
        var month = time.getMonth()+1;
        var year = time.getFullYear();
        var format = '';

        if(hour > 12){
            format = 'PM';
        }else{
            format = 'AM';
        }

        firestore()
        .collection('live_chat')
        .doc(new_id.toString())
        .set({
            id : new_id,
            message: this.state.typebox_text,
            time_str: `${year}-${month}-${day} ${hour}-${minute} ${format}`,
            timestamp: t,
            user_id: 2,
            user_name: this.state.username,
            user_profile_photo: this.state.photo,
            user_type: 'user',
            user_id: this.state.userid,
            show : true
        })
        .then(() => {
            this.setState({typebox_text : ''});
        });  
    }

    renderTime=(time)=>{
        var timestamp = new Date(time);
        var hour = timestamp.getHours();
        var minute = timestamp.getMinutes();
        var day = timestamp.getDate();
        var month = timestamp.getMonth()+1;
        var year = timestamp.getFullYear();

        var t = Math.floor(Date.now());
        var today = new Date(t);
        var yesterday = today.getDate()-1;
        var date_type = '';
        var format = '';
        var minute_after = '';
        var hour_after = '';

        hour_after = hour % 12 || 12; // Adjust hours

        if(minute.toString().length < 2){
            minute_after = '0'+minute;
        }else{
            minute_after = minute;
        }

        if(hour > 12){
            format = 'PM';
        }else{
            format = 'AM';
        }

        if(today.getDate() == timestamp.getDate()){
            date_type = 'අද දින';
        }else if(yesterday == timestamp.getDate()){
            date_type = 'ඊයේ දිනයේ';
        }else{
            date_type = `${year}-${month}-${day}`;
        }

        var return_value = `${date_type} ${hour_after}:${minute_after} ${format}`;

        return return_value;
    }

    renderItemOption = (title, icon) => {
        return(
            <View style={[styles.buttonrow]}>
                <Text style={[styles.moreoptionbuttontext]}>{title}</Text>
                <Icon name={icon} color={'white'}/>
            </View>
        )
    }

    deleteChatItem = (id) => {
        firestore()
        .collection('live_chat')
        .doc(id.toString())
        .update({
            show: false,
        })
        .then(() => {
            this.showToast('සංවාදය මකා දමන ලදී');
        });
    }

    renderChatItem(item){
        return(
            <>
            {item.type == 'user' ? 
            <>
                {item.show ?
                    <>
                        <Menu 
                            ref={r => (this.menu = r)}
                            renderer={this.state.renderer}
                        >
                        <MenuTrigger 
                            triggerOnLongPress={true}
                            children={  
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <View style={[styles.profilepicturecontainer, {alignSelf : 'flex-end', marginBottom : 20}]}>
                                    <Image source={{uri : item.photo}} style={[styles.profilepicturecontainer]}/>
                                </View>
                                <View style={{width : '70%'}}>
                                    <View style={[item.type == 'user' ? styles.chatbubblecontainer : styles.chatbubblecontainer_admin, {alignSelf : 'flex-start', backgroundColor : this.state.userid == item.user_id ? '#00b919' : 'gray'}]}>
                                        <View style={[styles.row]}>
                                            <Text style={[styles.usernametext]} numberOfLines={1}>{this.state.userid == item.user_id ? Languages.Me : item.name}</Text>
                                        </View>
                                        <Text style={[styles.messagetext]}>{item.message}</Text>
                                    </View>
                                    <Text style={[styles.timetext,{alignSelf : 'flex-start'}]}>{this.renderTime(item.time)}</Text>
                                </View>
                            </View>
                            }
                        />
                        <MenuOptions customStyles={optionsStyles}>
                        {this.state.userid == item.user_id ?
                            <MenuOption onSelect={() => this.deleteChatItem(item.id)}>
                                    {this.renderItemOption(Languages.Delete, 'trash')}
                            </MenuOption>
                        :null}
                        <MenuOption onSelect={() => {Clipboard.setString(item.message); this.showToast('Message copied to clipboard')}}>
                            {this.renderItemOption(Languages.Copy, 'copy')}
                        </MenuOption>
                        </MenuOptions>
                        </Menu>
                    </>
                :
                    null
                }
                <>
                </>
            </>
            
            :
                <View style={{flexDirection : 'row', width : '100%', justifyContent : 'flex-end'}}>
                    <View>
                        <View style={[styles.chatbubblecontainer_admin, {alignSelf : 'flex-end'}]}>
                            <Text style={[styles.usernametext, {alignSelf : 'flex-end'}]} numberOfLines={1}>{item.name}</Text>
                            <Text style={[styles.messagetext]}>{item.message}</Text>
                        </View>
                        <Text style={[styles.timetext,{alignSelf : 'flex-end'}]}>{this.renderTime(item.time)}</Text>
                    </View>
                    <View style={[styles.profilepicturecontainer, {alignSelf : 'flex-end', marginBottom : 20}]}></View>
                </View>
    }
            </>
        );
    }

    googleLoginFunction = () => {
        GoogleLogin.signIn()
    }

    renderTypeBoxContainer(){
        const logged = this.state.logged;
        const text = this.state.typebox_text;
        return(
            <View style={[styles.textinputcontainer]}>
                {logged ? 
                <>
                    <TextInput 
                        placeholder={Languages.EnterYourMessage}
                        value={this.state.typebox_text}
                        style={[styles.textinput]}
                        onChangeText={(text)=>this.setState({typebox_text : text})}
                    />
                    <TouchableOpacity onPress={()=> text == '' ? this.showToast('Please enter your message') : this.sendMessage()} style={[styles.iconholder, {backgroundColor : text == '' ? Colors.black : Colors.secondary}]}>
                        <Icon name={'send'} size={20} color={Colors.white}/>
                    </TouchableOpacity>
                </>
                :
                <View style={[styles.logintextcontainer]}>
                    <Text style={[styles.signintext]}>Please login to enter chat section</Text>
                    <TouchableOpacity onPress={this.googleLoginFunction} style={[styles.loginbuttonstyle]}>
                        <Text style={[styles.logintext]}>Login</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    renderBody(){
        return(
            <ImageBackground source={Images.ChatScreenBackground} style={{width : '100%', height : '100%'}} imageStyle={{width : '100%', height : '100%'}}>
                {/* <Button
                title={'FlatList ref button'}
                onPress={() => {
                    this.flatListRef.scrollToEnd({animating: true})
                    console.log('flatList ref value: ', this.flatListRef.scrollToEnd);
                }}
              /> */}
            <FlatList
                ref={(ref) => (this.flatListRef = ref)}
                data={this.state.chat_data}
                renderItem={({item})=>this.renderChatItem(item)}
                keyExtractor={item => item.id} 
                onScroll={({nativeEvent}) => {
                    if (this.isCloseToBottom(nativeEvent)) {
                        this.setState({is_closed_to_bottom : true})
                    }else{
                        this.setState({is_closed_to_bottom : false})
                    }
                }}
                style={{width : '100%', height : '100%', marginBottom : 80}}
                getItemLayout={(data, index) => (
                    {length: 100, offset: 100 * index, index}
                )}
                onScrollToTop={()=>console.log('TOP')}
                onLayout={() =>{
                    try{
                        this.flatListRef.scrollToEnd({ animated: true })
                    }catch(err){
                        console.log(err)
                    }
                }}
            />
                {this.renderTypeBoxContainer()}
                {this.scrolltoBottomButton()}

            </ImageBackground>
        );
    }

    scrolltoBottomButton = () => {
        return(
            <>
            {this.state.is_closed_to_bottom ? null :
                <TouchableOpacity onPress={()=>this.flatListRef.scrollToEnd({ animated: true })} style={[styles.scrolltobottombuttoncontainer]}>
                    <Icon name={'chevron-down-circle-outline'} size={25} color={Colors.white}/>
                </TouchableOpacity>
            }
            </>
        );
    }

    showToast = (text) => {
        ToastAndroid.showWithGravity(
            text, ToastAndroid.SHORT, ToastAndroid.CENTER
        );
    };
    
    render(){
        const bottomsheet = this.state.is_bottomsheet_open;
        return(
            <>
                <>
                <BottomSheet
                    ref="BottomSheet"
                    initialPosition={height-height}
                    snapPoints={snapPoints}
                    keyboardAware={true}
                    keyboardAwareExtraSnapHeight={70}
                    isBackDrop={true}
                    overDrag={true}
                    bounce={5}
                    dragEnabled={false}
                    isBackDropDismissByPress={true}
                    isRoundBorderWithTipHeader={true}
                    tipStyle={{backgroundColor:Colors.black}}
                    onChangeSnap={(data)=>this.onChangeBottomSheetSnap(data)}
                    headerStyle={{ backgroundColor: Colors.secondary, borderTopLeftRadius : 12, borderTopRightRadius : 12 }}
                    bodyStyle={{ width : '100%', height : '50%', backgroundColor : Colors.black }}
                    body={this.renderBody()}
                />
                </>
                {bottomsheet ? null : 
                    <HomeScreenFloationgButton action={()=>this.onOpenBottomSheetHandler(1)}/>
                }
            </>
        );
    }
}

const optionsStyles = {
    optionsContainer: {
      backgroundColor: Colors.darkgray,
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
    const navigation = useNavigation();
    return <LiveChatComponent {...props} navigation={navigation} />;
} 