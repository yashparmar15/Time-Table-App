import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
export default class HeaderCompo extends Component {
    constructor(props){
        super(props);
    }
    state = {
        loading : true
    }
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          });
        this.setState({loading : false});
      }
  render() {
    return (
    
      <Container style = {{maxHeight : 80}}>
          {this.state.loading ? <Text>Loading...</Text> : 
            <Header>
            <Left>
              <Button transparent onPress = {() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
                  <Title>{this.props.title}</Title>
            </Body>
            <Right>
              <Button transparent onPress = {() => this.props.navigation.navigate('Login')}>
              <Ionicons name="md-add" size={28} color="white" />
              </Button>
            </Right>
          </Header>
          }
      </Container>
    );
  }
}