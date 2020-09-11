import React, { Component } from 'react';
import { Image , View , Modal , StyleSheet , TouchableHighlight , Alert } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , Spinner , Header , Title , Textarea } from 'native-base';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { isSameUser } from 'react-native-gifted-chat/lib/utils';
import LineBreak from '../components/LineBreak';
const options = [
  <Text style={{color: 'red'}}>Cancel</Text>,
  <Text style={{color: '#606060'}}>Edit Cover Photo</Text>,
  <Text style={{color: '#606060'}}>Edit Profile Photo</Text>,
]
export default class ProfileScreen extends Component {


        state = {
            user : null,
            loading : true,
            title : '',
            modalVisible: false,
            isSameUser : false,
            modalVisible2 : false,
            modalVisible3 : false,
            
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
        
          uploadToFirebase = (blob,index) => {
        
            return new Promise((resolve, reject)=>{

                var storageRef = firebase.storage().ref();
                let imgurl = firebase.auth().currentUser.uid + ".jpg";
                let path = 'uploads/';
                if(index === 2) path = 'profile/'
                storageRef.child(path + imgurl).put(blob, {
                  contentType: 'image/jpeg'
                }).then((snapshot)=>{
          
                  blob.close();
          
                  resolve(snapshot);
          
                }).catch((error)=>{
          
                  reject(error);
          
                });
          
              });
        
          }      
        
        
          handleOnPress = (index) => { 
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
        
              return this.uploadToFirebase(blob,index);
        
            }).then((snapshot)=>{
                this.setState({loading : true});
                let img = firebase.auth().currentUser.uid + ".jpg";
                let path = 'uploads/';
                if(index == 2)
                    path = 'profile/'
                const ref = firebase.storage().ref(path + img);
                ref.getDownloadURL().then((url) => {
                    if(index === 1){
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                           cover_photo : url,
                        }).then(()=> {
                            firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value',data => {
                                this.setState({user : data.toJSON()});
                            }).then(()=> {
                                this.setState({loading : false});
                            })
                        })
                    } else {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                            profile_picture : url,
                         }).then(()=> {
                             firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value',data => {
                                 this.setState({user : data.toJSON()});
                             }).then(()=> {
                                 this.setState({loading : false});
                             })
                         })
                    }
                })
              console.log("File uploaded");
           
            }).catch((error)=>{
        
              throw error;
        
            }); 
        
          }
          actionEvent = (index) => {
              
              if(index === 2 || index === 1){
                this.setState({loading : true});
                this.handleOnPress(index);
              }
            
        }
      profileMenu = () => {
        if(this.state.isSameUser)
        this.ActionSheet.show()
      }
        
    async componentDidMount() {
        await firebase.database().ref('users/' + this.props.navigation.getParam('userid')).once('value', data => {
                this.setState({user : data.toJSON()});
        })
        if(firebase.auth().currentUser)
            this.setState({isSameUser : this.state.user.userid === firebase.auth().currentUser.uid})
        console.log(this.props.navigation.getParam('id'));
        if(!this.state.user.aboutme){
            this.setState({about : "Student at Indian Institute of Technology Goa"});
        }
        else
            this.setState({about : this.state.user.aboutme});
        this.setState({len : this.state.about.length})
        this.setState({loading : false});
    }

    sendtoChat = () => {
        if(!firebase.auth().currentUser){
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

        }else{
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value',data => {
                this.props.navigation.navigate('Chat' , {to : this.state.user , from : data.toJSON()});
            })
        }
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
          destructiveButtonIndex={4}
          onPress = {(index) => this.actionEvent(index)}
        />
          </Header>

        {this.state.loading ? <Spinner color = "blue" /> :
        <Content>

            <View  style = {{elevation : -1 , zIndex : 1}} onStartShouldSetResponder = {() => this.setState({modalVisible : true})}>
                {this.state.user.cover_photo ? <Image source={{uri : this.state.user.cover_photo}} style = {{width : null , height : 160  , resizeMode : 'cover'}} /> : <Image source={require('../../assets/cover.jpg')}  style = {{width : null , height : 160  , resizeMode : 'cover' , zIndex : 1 }}/>}

            </View>

            <View style = {{flexDirection : 'row' , justifyContent : 'space-between'}}>
            <View style = {{width : 120,elevation : 100 , zIndex : 2 , alignSelf : 'flex-start'}} onStartShouldSetResponder = {() => this.setState({modalVisible2 : true})}>
            
                <Image source = {{uri : this.state.user.profile_picture}} style = {{ width : 120 , height : 120 , borderRadius : 60 , marginTop : -60 ,borderWidth : 5 , borderColor : 'white' , marginLeft : 10}}/>
           
            </View>
            {!this.state.isSameUser ? 
            <TouchableOpacity style = {{alignSelf : 'flex-end' , marginTop : 10 , marginRight : 20 , backgroundColor : '#0073b1' , padding : 7 }} onPress = {()=> this.sendtoChat()}><Text style = {{color : 'white' , fontWeight : '700'}}>Send Message</Text></TouchableOpacity> : <TouchableOpacity style = {{alignSelf : 'flex-end' , marginTop : 10 , marginRight : 50 , backgroundColor : '#0073b1' , padding : 7 }} onPress = {() => this.setState({modalVisible3 : true})}><Text style = {{color : 'white' , fontWeight : '700'}}>Edit About Me</Text></TouchableOpacity>}
            </View>
            <Text style = {{marginTop : 0 , marginLeft : 10 , fontSize : 22 , width : 200 }}>{this.state.user.first_name}{' '}{this.state.user.last_name}</Text>
            <Text style = {{marginLeft : 10 , color : '#808080',marginRight : 20}}>{this.state.about}</Text>
            <LineBreak w = {0}/>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text style = {{fontSize : 20 , fontWeight : 'bold' , marginBottom : 15}}>Cover Photo</Text>
          {this.state.user.cover_photo ? <Image source={{uri : this.state.user.cover_photo}} style = {{resizeMode : 'contain' , width : 300 , height : 400}} /> : <Image source={require('../../assets/cover.jpg')}/>}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" , marginTop : 20 }}
              onPress={() => {
                this.setState({modalVisible : false})
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text style = {{fontSize : 20 , fontWeight : 'bold' , marginBottom : 15}}>Profile Photo</Text>
              <Image source = {{uri : this.state.user.profile_picture}} style = {{ width : 300 , height : 300 , resizeMode : 'contain'}}/>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" , marginTop : 20 }}
              onPress={() => {
                this.setState({modalVisible2 : false})
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible3}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style = {{fontSize : 20 , fontWeight : 'bold' , marginBottom : 15}}>Update About Me</Text>

              <Textarea style = {{width : 300}} rowSpan={5} bordered value= {this.state.about} onChangeText = {(text) => {if(text.length <= 150){this.setState({about : text}); this.setState({len : text.length})}}}/>
                <Text style = {{fontSize : 15  , marginTop : 10}}>Remaining : {150 - this.state.len}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" , marginTop : 20 }}
              onPress={() => {
                firebase.database().ref('users/' + this.state.user.userid).update({
                    aboutme : this.state.about
                }).then(()=> {
                    this.setState({modalVisible3 : false});
                })
              }}
            >
              <Text style={styles.textStyle}>Update</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      </Content>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });