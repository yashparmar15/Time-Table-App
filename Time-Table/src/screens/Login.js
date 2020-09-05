import React, { Component } from 'react';
import {Button} from 'react-native';
import { Container, Content, Form, Item, Input, Label , Toast,Root, Text } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
export default class LoginScreen extends Component {
    state = {
        user : "",
        pass : ""
    }
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
    onSignIn = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            )
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(result => {
                if(result.additionalUserInfo.isNewUser)
                {
                    firebase.database().ref('users/' + result.user.uid)
                    .set({
                        gmail : result.user.email,
                        profile_picture : result.additionalUserInfo.profile.picture,
                        locale : result.additionalUserInfo.profile.locale,
                        first_name : result.additionalUserInfo.profile.given_name,
                        last_name : result.additionalUserInfo.profile.family_name,
                        created_at : Date.now()
                    })
                } else {
                    firebase.database().ref('users/' + result.user.uid)
                    .update({
                        last_logged_in : Date.now()
                    })
                }
                this.props.navigation.navigate('Home');
                console.log("Logged in");
            })
            
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }
     signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
              behavior : 'web',
            androidClientId: '671031154846-q7gv044sasbsi5e1oqr2osm56nfbibbj.apps.googleusercontent.com',
            // iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
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
            <Button style = {{marginTop : 20}} color = "black"  title = "Login"  onPress = {() => this.signInWithGoogleAsync()}></Button>
        </Content>
        <Footer navigation = {this.props.navigation}/>
      </Container>
      </Root>
    );
  }
}