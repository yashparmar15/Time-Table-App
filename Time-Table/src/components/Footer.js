import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text,View, Spinner} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Alert} from 'react-native';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
export default class FooterTabs extends Component {
    state = {
        loading : true,
        loggedin : false,
        userid : '',
        posts : [],
        lforposts :false
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
        this.props.navigation.navigate('Profile',{id : this.state.user , userid : firebase.auth().currentUser.uid});
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

      async sendToPosts(){
        this.setState({lforposts : true});
          await firebase.database().ref('posts').once('value' , (data) => {
            for(var key in data.toJSON()){
                firebase.database().ref('posts/' + key).on('value' , d => {
                    var t;
                    t = this.state.posts;
                    t.push(d.toJSON());
                    this.setState({posts : t});
                })
            }
          })

          this.setState({lforposts : false});
          this.props.navigation.navigate('Posts' , {'posts' : this.state.posts.reverse()});
      }

  render() {
    return (
      <View>
        {this.state.lforposts ? <Text style = {{textAlign : 'center' , justifyContent : 'center' , textAlignVertical : 'center' , marginBottom : 10 , color : '#808080'}}>Hold on ,We are taking you there..</Text>:
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
                
                <Button vertical onPress = {() => this.sendToPosts()}>
                <Entypo name="info-with-circle" size={20} color="white"/>
                  <Text style = {{fontSize : 9}}>Posts</Text>
                </Button>
                <Button vertical onPress = {() => this.sendToFeedback()}>
                  <MaterialIcons name="feedback" size={20} color="white" />
                  <Text style = {{fontSize : 9}}>Feedback</Text>
                </Button>
              </FooterTab>
            }
        </Footer>
  }
        </View>
    );
  }
}