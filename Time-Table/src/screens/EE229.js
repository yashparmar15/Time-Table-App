import React, { Component } from 'react';
import { Image , View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class EE229 extends Component {
  render() {
    return (
    <View style = {{flex : 1 , backgroundColor : '#fff'}}>
      <Header navigation = {this.props.navigation} title = "EE229" show = {true}/>
        <Text style = {{marginBottom : 20 , marginTop : 20 , textAlign : 'center' , fontSize : 25 , fontWeight : 'bold', textDecorationLine : 'underline'}}>Power Electronics</Text>
      <Container style = {{paddingTop : 10}}>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../assets/sf.jpeg')} />
                <Body>
                  <Text>Dr. Sheron Figarido</Text>
                  <Text note>Assistant Professor</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={require('../../assets/sf.jpeg')} style={{height: 200, width: 200, flex: 1,alignSelf : 'center', borderRadius : 50}}/>
                <Text style = {{color : '#334455' , marginTop : 10 , textAlign : 'center',fontSize : 20 , alignSelf : 'center' , fontWeight : 'bold'}}>
                  Electrical Engineering Department
                </Text>
                <Text style = {{color : '#334455' , marginTop : 10 , textAlign : 'center',fontSize : 18 , alignSelf : 'center' , fontWeight : 'bold' , }}>
                Address: Admin Block, IIT Goa
                </Text>
                <Text 
                onPress={() => Linking.openURL('mailto:sheron@iitgoa.ac.in')}
                style = {{color : '#334455' , marginTop : 10 , textAlign : 'center',fontSize : 16 , alignSelf : 'center' , fontWeight : '500' , textDecorationLine : 'underline' , fontStyle : 'italic'}}>
                    sheron@iitgoa.ac.in
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <TouchableOpacity>
                  <Text style ={{color: '#00ddff' ,fontWeight : '900'}}>6 Credits</Text>
                </TouchableOpacity>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
      <TouchableOpacity 
                onPress = {() => this.props.navigation.navigate('Courses')}
                style = {{marginBottom : 20, alignSelf : 'center'}}><Text style = {{textAlign : 'center', borderColor : 'black' , borderWidth : 1,padding : 10 , width : 120 , borderRadius : 30}}>Go Back</Text></TouchableOpacity>
      <Footer/>
    </View>
    );
  }
}