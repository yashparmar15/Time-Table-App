import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default class LoginScreen extends Component {
  render() {
    return (
      <Container>
        <Header title = "Login" navigation = {this.props.navigation}/>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <Footer/>
      </Container>
    );
  }
}