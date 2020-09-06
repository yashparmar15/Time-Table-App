import React, { Component } from 'react';
import {Image, StyleSheet , TouchableOpacity, View} from 'react-native';
import { Container, Content, Form, Item, Input, Label , Toast,Root, Text , Icon , Button , Spinner} from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
export default class LoginScreen extends Component {
    state = {
        loading : false,
        working : false
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
                        created_at : Date.now(),
                        userid : result.user.uid
                    })
                } else {
                    firebase.database().ref('users/' + result.user.uid)
                    .update({
                        last_logged_in : Date.now()
                    })
                }
                this.props.navigation.navigate('Home');
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
        this.setState({working : true});
        try {
          const result = await Google.logInAsync({
              behavior : 'web',
            androidClientId: "671031154846-16j5ct84tj3oaqh4mckjdmvu8ui0bhnm.apps.googleusercontent.com",
            androidStandaloneAppClientId : "671031154846-16j5ct84tj3oaqh4mckjdmvu8ui0bhnm.apps.googleusercontent.com",
            // iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
              this.setState({working : false});
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
  render() {
    return (
        <Root>
            {this.state.loading ? <View>Loading....</View>:
      <Container>
            <Header title = "Login" navigation = {this.props.navigation} show = {false}/>
        <Content style = {{margin : 10}}>
            {this.state.working ? <Spinner color = "blue" /> : <View>
            <Text style = {{fontSize : 25 , fontWeight : 'bold' , textAlign : 'center', fontFamily : 'monospace' , marginTop : 50}}>Login to Continue</Text>
            <Text style = {{color : '#a0a0a0', marginBottom : 30 , marginTop : 5 , fontSize : 14 , textAlign : 'center' , fontFamily : 'monospace' , marginHorizontal : 3}}>Please login using IIT Goa Credential</Text>
            <Image source={require('../../assets/iitgoa.png')} style={{height: 200, width: 200, flex: 1,alignSelf : 'center', borderRadius : 50 , marginBottom : 40}}/>
            <TouchableOpacity style = {styles.btnGoogle} onPress = {() => this.signInWithGoogleAsync()}>
                <AntDesign name="googleplus" size={28} color="white" />
                <Text style = {{paddingLeft : 10, textAlign : 'center' , fontSize : 18 , color : 'white' , fontWeight : 'bold'}}>Sign In with Google</Text>
            </TouchableOpacity>
            </View>}
        </Content>
        <Footer navigation = {this.props.navigation}/>
      </Container>}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
    btnGoogle : {
        backgroundColor : '#db3236',
        width : 300,
        alignSelf : 'center',
        padding : 12,
        borderRadius : 8,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    }
})