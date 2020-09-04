import React, { Component } from 'react';
import {Button} from 'react-native';
import { Container, Content, Form, Item, Input, Label , Toast,Root, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default class LoginScreen extends Component {
    state = {
        user : "",
        pass : ""
    }
    componentWillUnmount() { if (Toast.toastInstance != null && Toast.toastInstance.root != null) { Toast.hide(); } }
    CheckPass = () => {
        if(this.state.user === ""){
            Toast.show({
                text: "Please Enter Username!",
                textStyle: { color: "yellow" },
                buttonText: "Okay",
                duration : 5000
              })
            return;
        }

        if(this.state.user === "admin" && this.state.pass === "yashparmar"){
            this.props.navigation.navigate('EE301');
        } else {
            Toast.show({
                text: "Wrong password!",
                textStyle: { color: "yellow" },
                buttonText: "Okay"
              })
            
        }
    }
  render() {
    return (
        <Root>
      <Container>
        <Header title = "Login" navigation = {this.props.navigation} show = {false}/>
        <Content style = {{margin : 10}}>
            <Text style = {{fontSize : 25 , fontWeight : 'bold' , textAlign : 'center', fontFamily : 'monospace' , marginTop : 50}}>Login to Continue</Text>
            <Text style = {{color : '#a0a0a0', marginBottom : 30 , marginTop : 5 , fontSize : 14 , textAlign : 'center' , fontFamily : 'monospace' , marginHorizontal : 3}}>Hold on sparky!, currently this page is only for Admin.</Text>
            <Item stackedLabel>
              <Label style = {{fontSize : 15 , fontFamily : 'monospace'}}>Username</Label>
              <Input style = {{borderColor : '#808080' , borderBottomWidth : 1}} value = {this.state.user} onChangeText = {(text) => this.setState({user : text})}/>
            </Item>
            <Item stackedLabel last style = {{marginTop : 20}}>
              <Label style = {{fontSize : 15 , fontFamily : 'monospace'}}>Password</Label>
              <Input secureTextEntry={true} style = {{marginBottom : 50 , borderColor : '#808080' , borderBottomWidth : 1}} value = {this.state.pass} onChangeText = {(text) => this.setState({pass : text})}/>
            </Item>
            <Button style = {{marginTop : 20}} color = "black"  title = "Login"  onPress = {() => this.CheckPass()}></Button>
        </Content>
        <Footer navigation = {this.props.navigation}/>
      </Container>
      </Root>
    );
  }
}