import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text } from 'native-base';
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
            "Alert Title",
            "My Alert Msg",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
      }

      logout = () => {
        this.setState({loggedin : false})
        firebase.auth().signOut();
      }

  render() {
    return (
    
      <Container style = {{maxHeight : 80}}>
          {this.state.loading ? <Text>Loading...</Text> : 
            <Header>
            <Left>
              <Button transparent onPress = {() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
          <Title>{this.props.title}</Title>
            </Body>
            <Right>
                {this.props.show ? !this.state.loggedin ? <Button transparent onPress = {() => this.props.navigation.navigate('Login')}>
              <Ionicons name="md-add" size={28} color="white" />
              </Button> : 
                <Button transparent onPress = {this.logoutUser() }>
                <Entypo name="log-out" size={24} color="white" />
                </Button>
                  : null}
            </Right>
          </Header>
          }
      </Container>
    );
  }
}