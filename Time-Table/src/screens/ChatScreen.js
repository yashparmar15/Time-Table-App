import * as React from 'react';
import { Platform , KeyboardAvoidingView,SafeAreaView , Text } from 'react-native';
// @flow
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Header from '../components/Header';
import Fire from '../components/utils/Fire';
import firebase from 'firebase';

import { View } from 'native-base';



class ChatScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('to').first_name,
  });

  state = {
    messages: [],
    title : this.props.navigation.getParam('to').first_name + " " + this.props.navigation.getParam('to').last_name,
    
  };

  get user() {
    return {
      name: this.props.navigation.getParam('from').first_name,
      avatar : this.props.navigation.getParam('from').profile_picture,
      _id: Fire.shared.uid,
    };
  }

  render() {
       const chat=<GiftedChat messages={this.state.messages} 
       onSend={Fire.shared.send} 
       imageProps = {this.props.navigation.getParam('from').profile_picture}
       alwaysShowSend
       isTyping
       scrollToBottom
       user={this.user}/>;

        // if(Platform.OS=='android'){
        //     return(
        //         <KeyboardAvoidingView style={{flex:1}}behavior="padding" keyboardVerticalOffset={0} enabled>
        //             {chat}
        //         </KeyboardAvoidingView>
        //     );
        // }
    return(
        <SafeAreaView style={{flex:1}}>
            <Header show = {true} navigation = {this.props.navigation} title = {this.state.title} showlogout = "Chat"/>
            {chat}
        </SafeAreaView>
           

    )
  }

  async componentDidMount() {
      this.setState({to : this.props.navigation.getParam('to').userid});
      this.setState({from : this.props.navigation.getParam('from').userid});
      let chatid =   this.props.navigation.getParam('to').userid > this.props.navigation.getParam('from').userid ? this.props.navigation.getParam('from').userid + this.props.navigation.getParam('to').userid : this.props.navigation.getParam('to').userid + this.props.navigation.getParam('from').userid;
      console.log(chatid);
      await firebase.database().ref('users/' + this.props.navigation.getParam('from').userid).update({
          chatid : chatid
      }).then(()=> {
        
      })
      Fire.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );

      
    
  }
  componentWillUnmount() {
    firebase.database().ref('users/' + this.props.navigation.getParam('from').userid).update({
        chatid : ""
    }).then(()=> {
      Fire.shared.off();
         
    })
  }
}

export default ChatScreen;
