import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text , Toast,Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Alert } from 'react-native';
import firebase from 'firebase';
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
                {this.props.show ? !this.state.loggedin ? <Button transparent onPress = {() => this.props.navigation.navigate('Login')}>
                <Entypo name="login" size={24} color="white" />
              </Button> : 
                <Button transparent onPress = {() => this.logoutUser() }>
                <Entypo name="log-out" size={24} color="white" />
                </Button>
                  : null}
            </Right>:null}
          </Header>
          }
          </Root>
      </Container>
    );
  }
}