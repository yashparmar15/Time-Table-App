import React, { Component } from 'react';
import { Container, Content, Item, Input, Icon , Text ,Label ,Textarea ,Toast ,Root} from 'native-base';
import {Button} from 'react-native'
import Header from '../components/Header';
import Footer from '../components/Footer';
import LineBreak from '../components/LineBreak';
import Firebase from '../components/utils/firebase';
export default class FeedbackScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            message : ""
        }
    }
    componentWillUnmount() { if (Toast.toastInstance != null && Toast.toastInstance.root != null) { Toast.hide(); } }
    submitFeedback = () => {
        if(this.state.name === ""){
            Toast.show({
                text: "Please Enter Name!",
                textStyle: { color: "yellow" },
                buttonText: "Okay",
                duration : 5000
              })
            return;
        }
        if(this.state.message === ""){
            Toast.show({
                text: "Please Enter Message!",
                textStyle: { color: "yellow" },
                buttonText: "Okay",
                duration : 5000
              })
            return;
        }
        var count = 0;
        Firebase.database().ref('feedback').once('value' , data => {
            count = data.numChildren();
        }).then(() => {
            Firebase.database().ref(`feedback/${count}`).set({
                name : this.state.name,
                message : this.state.message
            }).then(() => {
                this.setState({name : ""});
                this.setState({message : ""});
                Toast.show({
                    text: "Submitted Successfully!",
                    textStyle: { color: "black" },
                    buttonText: "Okay",
                    type : "success",
                    duration : 5000
                  })
            })
        })
    }
  render() {
    return (
        <Root>
        <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "Feedback Form"/>
        <Content style = {{marginHorizontal : 10}}>
            <Text style = {{fontSize : 28 , fontWeight : 'bold' , textAlign : 'center' , marginTop : 10 , fontFamily : 'monospace' , textDecorationLine : 'underline'}}>Feedback Form</Text>
            <Text style = {{fontSize : 15 , textAlign : 'center' , marginHorizontal : 10 , color : '#808080',marginTop : 5,marginBottom : 20}}>Your Feedback is valuable for me. Please do not spam my Inbox.</Text>
            <LineBreak text = "" w = {0}/>
            <Item stackedLabel style = {{marginLeft : 10 , marginRight : 10}}>
              <Label style = {{fontSize : 16 ,fontWeight : 'bold' , fontFamily : 'monospace'}}>Full Name</Label>
              <Input placeholder = "Enter Your Name" style = {{color : '#404040' , fontSize : 15}} value = {this.state.name} onChangeText = {(text) => this.setState({name : text})} />
            </Item>
            <Label style = {{fontSize : 16 ,fontWeight : 'bold' , fontFamily : 'monospace',marginLeft : 10 , marginRight : 10 , color : '#707070', marginTop : 20 , marginBottom : 10}}>Message :-</Label>
            <Textarea rowSpan={5} bordered placeholder="Enter Your Message" style = {{marginLeft : 10 , marginRight : 10 , color : '#404040' , fontSize : 15 , padding : 5 , borderRadius : 10 , marginBottom : 25 }} 
                value = {this.state.message}
                onChangeText = {(text) => this.setState({message : text})}
            />
            <Button title = "Submit" color = "black" onPress = {() => this.submitFeedback() }/>
        </Content>
        <Footer />
      </Container>
      </Root>
    );
  }
}