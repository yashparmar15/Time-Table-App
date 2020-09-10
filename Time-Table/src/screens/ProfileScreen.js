import React, { Component } from 'react';
import { Image , View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , Spinner } from 'native-base';
import Header from '../components/Header';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
export default class ProfileScreen extends Component {


        state = {
            user : null,
            loading : true,
            title : ''
        }

        uriToBlob = (uri) => {

            return new Promise((resolve, reject) => {
        
              const xhr = new XMLHttpRequest();
        
              xhr.onload = function() {
                // return the blob
                resolve(xhr.response);
              };
              
              xhr.onerror = function() {
                // something went wrong
                reject(new Error('uriToBlob failed'));
              };
        
              // this helps us get a blob
              xhr.responseType = 'blob';
        
              xhr.open('GET', uri, true);
              xhr.send(null);
        
            });
        
          }
        
          uploadToFirebase = (blob) => {
        
            return new Promise((resolve, reject)=>{

                var storageRef = firebase.storage().ref();
                let imgurl = firebase.auth().currentUser.uid + ".jpg";
                storageRef.child('uploads/' + imgurl).put(blob, {
                  contentType: 'image/jpeg'
                }).then((snapshot)=>{
          
                  blob.close();
          
                  resolve(snapshot);
          
                }).catch((error)=>{
          
                  reject(error);
          
                });
          
              });
        
          }      
        
        
          handleOnPress = () => { 
            console.log("Clicked")
            ImagePicker.launchImageLibraryAsync({ 
              mediaTypes: "Images"
            }).then((result)=>{ 
        
              if (!result.cancelled) {
                // User picked an image
                const {height, width, type, uri} = result;
                return this.uriToBlob(uri);
        
              }
        
            }).then((blob)=>{
        
              return this.uploadToFirebase(blob);
        
            }).then((snapshot)=>{
                this.setState({loading : true});
                let img = firebase.auth().currentUser.uid + ".jpg";
                const ref = firebase.storage().ref('uploads/' + img);
                ref.getDownloadURL().then((url) => {
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                        cover_photo : url
                    }).then(()=> {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value',data => {
                            this.setState({user : data.toJSON()});
                        }).then(()=> {
                            this.setState({loading : false});
                        })
                    })
                })
              console.log("File uploaded");
           
            }).catch((error)=>{
        
              throw error;
        
            }); 
        
          }
        
    async componentDidMount() {
        await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value',data => {
            this.setState({user : data.toJSON()});
        })
        this.setState({loading : false});
    }
  render() {
    
    return (
      <Container>
        <Header title = "Profile"  navigation = {this.props.navigation} show = {true} n = "menu"/>
        {this.state.loading ? <Spinner color = "blue" /> :
        <Content style = {{marginTop : -22}}>
            <View>

            {this.state.user.cover_photo ? <Image source={{uri : this.state.user.cover_photo}} style = {{width : null , height : 160  , resizeMode : 'cover' }}/> : <Image source={require('../../assets/cover.jpg')} style = {{width : null , height : 160  , resizeMode : 'cover'}}/>}
            
            </View>
        </Content>}
      </Container>
    );
  }
}