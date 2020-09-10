import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text , Toast,Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Alert } from 'react-native';
import firebase from 'firebase';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
const options = [
  <Text style={{color: 'red'}}>Cancel</Text>,
  <Text style={{color: '#606060'}}>Edit Cover Photo</Text>,
  <Text style={{color: '#606060'}}>Send Message</Text>,
]
export default class HeaderCompo extends Component {
    constructor(props){
        super(props);
    }
    state = {
        loading : true,
        loggedin : false
    }
    async componentDidMount() {
        if(firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log(firebase.auth().currentUser.displayName);
                this.setState({loggedin : true});
            } else {
                this.setState({loggedin : false})
            }
        }))
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          });
        this.setState({loading : false});
      }

      logoutUser = () => {
        Alert.alert(
            "Logging out..",
            "Are you sure?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Yes", onPress: () => this.logout() }
            ],
            { cancelable: false }
        );
      }

      logout = () => {
        this.setState({loggedin : false})
        firebase.auth().signOut();
        Toast.show({
            text: "Logout Successfully!",
            textStyle: { color: "yellow" },
            type : 'success',
            position : 'down',
            buttonText: "Okay",
            duration : 2000
          })
      }

      profileMenu = () => {
        this.ActionSheet.show()
      }

      actionEvent = (index) => {
        let cur ;
        if(index === 1){
            console.log("Hello");
            this.props.onclick1;
            return;
        }
        firebase.auth().onAuthStateChanged(user => {
            if(!user)
                this.props.navigation.navigate('Login');
            else {
                firebase.database().ref('users/' + user.uid).once('value' , data=>{
                    if(index == 2){
                        this.props.navigation.navigate('Chat' , {to : this.state.user , from : data.toJSON()});
                    }
                })
            }
        })
  }

  render() {
    var mar = 20;
    if(this.props.showlogout === "Chat")
      mar = 0;

    return (
      <Container style = {{maxHeight : 80}}>
          <Root >
          {this.state.loading ? <Text>Loading...</Text> : 
            <Header>
              
              {this.props.mssg !== "Home" ?<Left>
            
              <Button transparent onPress = {() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button> 
            </Left>: null}
            <Body>
          <Title style = {{marginLeft : mar}}>{this.props.title}</Title>
            </Body>
            {this.props.showlogout !== "Chat" ?
            <Right>
                {this.props.n === "menu" ?  
                 <Button transparent >
                 <Entypo name="menu" size={24} color="white" onPress = {() => this.profileMenu()}/>
                 </Button> : this.props.show ? !this.state.loggedin ? <Button transparent onPress = {() => this.props.navigation.navigate('Login')}>
                <Entypo name="login" size={24} color="white" />
              </Button> : 
                <Button transparent onPress = {() => this.logoutUser() }>
                <Entypo name="log-out" size={24} color="white" />
                </Button>
                  : null}
            </Right>:null}
          </Header>
          }
          <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{color: '#505050', fontSize: 18 , fontWeight : 'bold'}}>Choose An Option</Text>}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={2}
          onPress = {(index) => this.actionEvent(index)}
        />
          </Root>
          
      </Container>
    );
  }
}