import React, { Component } from 'react';
import { Container, Content, Item, Input, Icon , Text ,Label ,Textarea} from 'native-base';
import {Button} from 'react-native'
import Header from '../components/Header';
import Footer from '../components/Footer';
import LineBreak from '../components/LineBreak';
export default class FeedbackScreen extends Component {
    state = {
        name : "",
        message : ""
    }
  render() {
    return (
        <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "Feedback Form"/>
        <Content style = {{marginHorizontal : 10}}>
            <Text style = {{fontSize : 28 , fontWeight : 'bold' , textAlign : 'center' , marginTop : 10 , fontFamily : 'monospace' , textDecorationLine : 'underline'}}>Feedback Form</Text>
            <Text style = {{fontSize : 15 , textAlign : 'center' , marginHorizontal : 10 , color : '#808080',marginTop : 5,marginBottom : 20}}>Your Feedback is valuable for me. Please do not spam my Inbox.</Text>
            <LineBreak text = "" w = {0}/>
            <Item stackedLabel style = {{marginLeft : 10 , marginRight : 10}}>
              <Label style = {{fontSize : 16 ,fontWeight : 'bold' , fontFamily : 'monospace'}}>Full Name</Label>
              <Input placeholder = "Enter Your Name" style = {{color : '#404040' , fontSize : 15}} />
            </Item>
            <Label style = {{fontSize : 16 ,fontWeight : 'bold' , fontFamily : 'monospace',marginLeft : 10 , marginRight : 10 , color : '#707070', marginTop : 20 , marginBottom : 10}}>Message :-</Label>
            <Textarea rowSpan={5} bordered placeholder="Enter Your Message" style = {{marginLeft : 10 , marginRight : 10 , color : '#404040' , fontSize : 15 , padding : 5 , borderRadius : 10 , marginBottom : 25 }} 
            
            />
            <Button title = "Submit" color = "black" marginHorizontal = "10"/>
        </Content>
        <Footer />
      </Container>
    );
  }
}