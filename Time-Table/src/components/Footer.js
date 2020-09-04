import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text,View } from 'native-base';
export default class FooterTabs extends Component {
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
        <Footer>
            {this.state.loading ? <View></View> : 
                <FooterTab>
                <Button vertical>
                  <Icon name="apps" />
                  <Text>Apps</Text>
                </Button>
                <Button vertical>
                  <Icon name="camera" />
                  <Text>Camera</Text>
                </Button>
                <Button vertical active>
                  <Icon active name="navigate" />
                  <Text>Navigate</Text>
                </Button>
                <Button vertical>
                  <Icon name="person" />
                  <Text>Contact</Text>
                </Button>
              </FooterTab>
            }
        </Footer>
    );
  }
}