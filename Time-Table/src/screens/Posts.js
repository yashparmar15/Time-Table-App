import React, { Component } from 'react';
import { Image , StyleSheet , TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Spinner} from 'native-base';
import {Entypo} from '@expo/vector-icons';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
export default class CardShowcaseExample extends Component {

    state = {
        posts : [],
        loading : true
    }

    componentDidMount =()=> {
        this.setState({loading : true})
        firebase.database().ref('posts').once('value' , (data) => {
            for(var key in data.toJSON()){
                firebase.database().ref('posts/' + key).on('value' , d => {
                    var t;
                    t = this.state.posts;
                    t.push(d.toJSON());
                    this.setState({posts : t});
                })
            }
        }).then(() => {
            this.state.posts.reverse();
            this.setState({loading : false})
        })
    }

  render() {
    return (
      <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "Posts"/>
        {this.state.loading ? <Spinner color = "blue" style = {{flex : 1}}/> : 
        <Content>
            {this.state.posts.map(data => {{
                return(
                <Card key = {data.postid}>
                <CardItem>
                  <Left>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Profile', {'userid' : data.by})}><Thumbnail source={{uri: data.userpic}} /></TouchableOpacity>
                    <Body>
                        <Text>{data.name}</Text>
                        <Text note>{data.date}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>{data.title}</Text>
                    <Text style = {{color : '#606060'}}>
                      {data.description}
                    </Text>
                    {data.url !== "" ? <Image source={{uri: data.url}} style = {{width : 300 , height : 400 , resizeMode :'contain', alignSelf : 'center'}}/> : null}
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                    <FontAwesome name="comments" size={24} color="black" />
                        <Text>View Comments()</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
                )
            }})}
        </Content>}
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