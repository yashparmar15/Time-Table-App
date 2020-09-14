import React, { Component } from 'react';
import { Container, Content, Item, Input , Text , Label ,Textarea, Spinner , Toast } from 'native-base';
import {TouchableOpacity , View} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LineBreak from '../components/LineBreak';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
export default class AddPost extends Component {
    state = {
        title : "",
        description : "",
        loading : true,
        url : "",
        et : "",
        ed : "",
    }


    async componentDidMount(){
        await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value' , data => {
            this.setState({user : data.toJSON()});
        });
        this.setState({loading : false});
    }

    /////////////////////////////////////////////////////////////////////////



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
            let imgurl = Date.now() + ".jpg";
            let path = 'posts/';
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
    
    
      handleOnPress = () => { 
          this.setState({loading : true});
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
            let img = firebase.auth().currentUser.uid + ".jpg";
            let path = 'uploads/';
            const ref = firebase.storage().ref(path + img);
            ref.getDownloadURL().then((url) => {
                this.setState({url : url})
            })
            this.setState({loading : false});
          console.log("File uploaded",this.state.url);
       
        }).catch((error)=>{
    
          throw error;
    
        }); 
    
      }

      submitpost = () => {
          if(this.state.title === ""){
              this.setState({et : "Title can't be empty."})
              return;
          }
          this.setState({et : ""});
          let d = new Date(Date.now());
          const pid = Date.now();
          firebase.database().ref('posts/' + pid).set({
              title : this.state.title,
              description : this.state.description,
              date : d.toLocaleString(),
              by : this.state.user.userid,
              userpic : this.state.user.profile_picture,
              name : this.state.user.first_name + " " + this.state.user.last_name,
              url : this.state.url,
              postid : pid,
              comments : [{}],
              order : -pid
          }).then(() => {
              this.setState({url : ""});
              this.setState({title : ""});
              this.setState({description : ""});
              this.setState({et : ""});
              Toast.show({
                text: "Successfully added!",
                textStyle: { color: "yellow" },
                buttonText: "Okay",
                type :'success',
                position : 'top'
              })
          })


      }



    /////////////////////////////////////////////////////////////////////
  render() {
    return(
        <Container>
            <Header show = {true} navigation = {this.props.navigation} title = "Add Post"/>
            {this.state.loading ? <Spinner style = {{flex : 1}} color = "blue" /> :<Content style = {{marginHorizontal : 10}}>
                <Text style = {{fontSize : 25 , fontWeight : 'bold' , fontFamily : 'monospace' , textAlign : 'center' , color : '#606060'}}>Add Post</Text>
                <LineBreak />
                <Label style = {{fontSize : 18 , color : '#505050' ,fontWeight : 'bold'}}>Title *</Label>
                {this.state.et !== "" ? <Text style = {{fontSize : 12 , color : 'red'}}>{this.state.et}</Text> : null}
                <Item >
                <Input style = {{fontSize : 16 , color : '#808080' , borderColor : '#707070' , borderWidth : 1 , borderRadius : 10 , paddingLeft : 10}} placeholder = "Enter Your Title" value = {this.state.title} onChangeText = {(text)=> {this.setState({title : text}); this.setState({et : ""})} }/>
                </Item>
                <Label style = {{fontSize : 18 , color : '#505050' ,fontWeight : 'bold' , marginTop : 5}}>Description</Label>
                <Textarea style = {{fontSize : 16 , color : '#808080' , borderColor : '#707070' , borderWidth : 1 , borderRadius : 10 , padding : 5}} rowSpan={5} bordered placeholder="Add Description" value = {this.state.description} onChangeText = {(text) => this.setState({description : text})} />
                <Label style = {{fontSize : 18 , color : '#404040' ,fontWeight : 'bold' , marginTop : 10}}>Add Photo</Label>
                <TouchableOpacity style = {{width : null , backgroundColor : '#f0f0f0' , padding : 10 , borderRadius : 10 }} onPress = {() => this.handleOnPress()}>
                    <Text style = {{textAlign : 'center' , color : '#404040' , fontWeight : '700'}}>{this.state.url === "" ? "Add Photo" : "Change Photo"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{width : null , backgroundColor : '#000' , padding : 10 , borderRadius : 10 , marginTop : 20 }} onPress = {() => this.submitpost()}>
                    <Text style = {{textAlign : 'center' , color : '#fff' , fontWeight : '700'}}>Submit Post</Text>
                </TouchableOpacity>
            </Content>}
            <Footer navigation = {this.props.navigation} />
      </Container>
    );
  }
}