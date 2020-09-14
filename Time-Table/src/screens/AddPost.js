import React, { Component } from 'react';
import { Container, Content, Item, Input } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default class AddPost extends Component {
  render() {
    return (
      <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "Add Post"/>
        <Content>
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        </Content>
        <Footer navigation = {this.props.navigation} />
      </Container>
    );
  }
}