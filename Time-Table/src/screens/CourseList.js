import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default class CourseList extends Component {
  render() {
    return (
      <Container>
        <Header show = {true} title = "Courses List" navigation = {this.props.navigation}/>
          <Text style = {{fontSize : 25 , textAlign : 'center' , fontWeight : 'bold' , marginBottom : 30 , marginTop : 30}}>Courses and Instructors</Text>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/sp.jpeg')} />
              </Left>
              <Body>
                <Text>Electromagnetic Waves</Text>
                <Text note numberOfLines={1}>Dr. Shakti Prasad D (EE301)</Text>
              </Body>
              <Right>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('EE301')}>
                  <Text style = {{color :  '#00a0bb'}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/kd.jpeg')} />
              </Left>
              <Body>
                <Text>Probability and Random Processes</Text>
                <Text note numberOfLines={1}>Dr. Kuntal Deka (EE325)</Text>
              </Body>
              <Right>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('EE325')}>
                  <Text style = {{color :  '#00a0bb'}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/nr.jpeg')} />
              </Left>
              <Body>
                <Text>Communication Systems</Text>
                <Text note numberOfLines={1}>Dr. Neelakandan Rajamohan (EE308)</Text>
              </Body>
              <Right>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('EE308')}>
                  <Text style = {{color :  '#00a0bb'}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/sf.jpeg')} />
              </Left>
              <Body>
                <Text>Power Electronics</Text>
                <Text note numberOfLines={1}>Dr. Sheron Fegarado (EE229)</Text>
              </Body>
              <Right>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('EE229')}>
                  <Text style = {{color :  '#00a0bb'}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/sh.png')} />
              </Left>
              <Body>
                <Text>Language and Society</Text>
                <Text note numberOfLines={1}>Dr. Sabiha Hashmi (HS301)</Text>
              </Body>
              <Right>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('HS301')}>
                  <Text style = {{color :  '#00a0bb'}}>View</Text>
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
          <TouchableOpacity 
                onPress = {() => this.props.navigation.navigate('Home')}
                style = {{marginTop : 80 , alignSelf : 'center'}}><Text style = {{textAlign : 'center', borderColor : 'black' , borderWidth : 1,padding : 10 , width : 120 , borderRadius : 30}}>Go Back</Text></TouchableOpacity>
        </Content>
        <Footer/>
      </Container>
    );
  }
}