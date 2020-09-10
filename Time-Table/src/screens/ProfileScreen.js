import React, { Component } from 'react';
import { Image , View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , Spinner , Header , Title } from 'native-base';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
const options = [
  <Text style={{color: 'red'}}>Cancel</Text>,
  <Text style={{color: '#606060'}}>Edit Cover Photo</Text>,
  <Text style={{color: '#606060'}}>Send Message</Text>,
]
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
          actionEvent = (index) => {
            let cur ;
            if(index === 1){
                this.handleOnPress();
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
      profileMenu = () => {
        this.ActionSheet.show()
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
        <Header>
            <Left>
                <Button transparent onPress = {() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button> 
            </Left>
            <Body>
          <Title style = {{marginLeft : 20}}>Profile</Title>
            </Body>
            <Right>
                 <Button transparent >
                 <Entypo name="menu" size={24} color="white" onPress = {() => this.profileMenu()}/>
                 </Button> 
            </Right>
            <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{color: '#505050', fontSize: 18 , fontWeight : 'bold'}}>Choose An Option</Text>}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={2}
          onPress = {(index) => this.actionEvent(index)}
        />
          </Header>
        {this.state.loading ? <Spinner color = "blue" /> :
        <Content>
            <View>

            {this.state.user.cover_photo ? <Image source={{uri : this.state.user.cover_photo}} style = {{width : null , height : 160  , resizeMode : 'cover' }}/> : <Image source={require('../../assets/cover.jpg')} style = {{width : null , height : 160  , resizeMode : 'cover'}}/>}
            
            </View>
        </Content>}
      </Container>
    );
  }
}