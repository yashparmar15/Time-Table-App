import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text,View} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Alert} from 'react-native';
import firebase from 'firebase';
export default class FooterTabs extends Component {
    state = {
        loading : true,
        loggedin : false,
        userid : '',
    }
    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
              this.setState({userid : user.uid});
              this.setState({loggedin : true});
            }
        })
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          });
          this.getUser();
          this.setState({loading : false});
      }

      async getUser() {
        await firebase.database().ref('users/' + this.state.userid).once('value' , data => {
          this.setState({user : data.toJSON()});
        })
      }

      sendtoProfile = () => {
        if(this.state.loggedin){
          console.log(this.state.user)
        this.props.navigation.navigate('Profile',{id : this.state.user});
        return;
        }
        else{
        Alert.alert(
          "You are not logged in!",
          "Please login to continue",
          [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Ok", onPress: () => this.props.navigation.navigate('Login') }
            ],
            { cancelable: false }
      )
          }
      }
      sendToFeedback = () => {
        if(this.state.loggedin){
        this.props.navigation.navigate('Feedback');
        }
        else{
        Alert.alert(
          "You are not logged in!",
          "Please login to continue",
          [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Ok", onPress: () => this.props.navigation.navigate('Login') }
            ],
            { cancelable: false }
      )
          }
      }

  render() {
    return (
        <Footer>
            {this.state.loading ? <View></View> : 
                <FooterTab>
                <Button vertical onPress = {() => this.sendtoProfile()}>
                <FontAwesome5 name="user-alt" size={20} color="white" />
                  <Text style = {{fontSize : 9}}>Dashboard</Text>
                </Button>
                <Button vertical onPress = {() => this.props.navigation.navigate('Users')}>
                <FontAwesome name="users" size={20} color="white" />
                  <Text style = {{fontSize : 9}}>Users</Text>
                </Button>
                
                <Button vertical active>
                  <Icon active name="navigate" />
                  <Text style = {{fontSize : 9}}>Navigate</Text>
                </Button>
                <Button vertical onPress = {() => this.sendToFeedback()}>
                  <MaterialIcons name="feedback" size={20} color="white" />
                  <Text style = {{fontSize : 9}}>Feedback</Text>
                </Button>
              </FooterTab>
            }
        </Footer>
    );
  }
}