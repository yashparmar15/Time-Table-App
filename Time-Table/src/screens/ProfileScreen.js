import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , Spinner } from 'native-base';
import firebase from 'firebase';
export default class ProfileScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            user : null,
            loading : true
        }
    }

    componentDidMount = () => {
       this.setState({user : this.props.navigation.getParam('id')})
       this.setState({loading : false});
    }
  render() {
    return (
      <Container>
        <Header />
        {this.state.loading ? <Spinner color = "blue" /> :
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.state.user.profile_picture}} />
                <Body>
                    <Text>{this.state.user.userid}</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.user.profile_picture}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text onPress = {() => {console.log(this.state.user)}}>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>}
      </Container>
    );
  }
}