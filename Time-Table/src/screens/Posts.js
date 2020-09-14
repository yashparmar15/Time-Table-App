import React, { Component } from 'react';
import { Image , StyleSheet , TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import {Entypo} from '@expo/vector-icons';
import firebase from 'firebase';
export default class CardShowcaseExample extends Component {
  render() {
    return (
      <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "Posts"/>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
        {firebase.auth().currentUser && (firebase.auth().currentUser.uid === "h3XMO2YedfVTidhTlso2kKjfeP93" || firebase.auth().currentUser.uid === "PIigCG6hA6gvZcHWuWAX7MhfGFq1") ? <TouchableOpacity style = {styles.btnadd} onPress = {()=> this.props.navigation.navigate('AddPost')}><Entypo name="plus" size={30} color="white" /></TouchableOpacity> : null}
        <Footer navigation = {this.props.navigation}/>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    btnadd : {
        position : 'absolute',
        bottom : 60,
        alignSelf : 'flex-end',
        backgroundColor : 'black',
        width : 50,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 25,
        right : 10
    }
})