import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderCompo extends Component {
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          });
      }
  render() {
    return (
      <Container style = {{maxHeight : 80}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
                <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}