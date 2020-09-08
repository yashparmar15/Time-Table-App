import React, { Component } from 'react';
import {StyleSheet , View} from 'react-native';
import { Container, Content, List, ListItem, Text  ,Left , Right , Icon , Spinner} from 'native-base';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import firebase from 'firebase';

const options = [
    <Text style={{color: 'red'}}>Cancel</Text>,
    <Text style={{color: '#1261A0' , fontWeight : '700' , textDecorationLine :'underline'}}>View Profile</Text>,
    <Text style={{color: '#606060'}}>Send Message</Text>,
  ]

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : {"a" : [] , "b" : [] , "c" : [] , "d" : [] , "e" : [] , "f" : [] , "g" : [] , "h" : [] , "i" : [] , "j" : [] , "k" : [] , "l" : [] , "m" : [] , "n" : [] , "o" : [] , "p" : [] , "q" : [] , "r" : [] , "s" : [] , "t" : [] , "u" : [] ,"v" : [] , "w" : [] , "x" : [] , "y" : [] , "z" : []},
            loading : true,
            alpha : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",'v',"w","x","y","z"],
        };
      }

      actionEvent = (index) => {
            let cur ;
            if(index === 1){
                this.props.navigation.navigate('Profile',{id : this.state.user});
            }
            firebase.auth().onAuthStateChanged(user => {
                if(!user)
                    this.props.navigation.navigate('Login');
                else {
                    firebase.database().ref('users/' + user.uid).once('value' , data=>{
                        if(index == 2){
                            this.props.navigation.navigate('Chat' , {to : this.state.user , from : data.toJSON()});
                        }
                    })
                }
            })
      }

      componentDidMount = () => {
            var users;
            firebase.database().ref('users').once('value' , (data) => {
                users = data.toJSON();
            }).then((data)=> {
                for(var key in data.toJSON()){
                    firebase.database().ref('users/' + key).once('value' , d => {
                        var t = this.state.users;
                        var ch = d.toJSON().first_name.toLowerCase();
                        t[ch[0]].push(d.toJSON());
                        this.setState({users : t});
                    })
                }
            })
            this.setState({loading : false});
      }
      showActionSheet = (id) => {
        this.setState({user : id})
        this.ActionSheet.show()
      }
  render() {
    return (
      <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "All Users"/>
        {this.state.loading ? <Spinner color = "blue"/> :
        <Content >
          <List>
                {
                    this.state.alpha.map(t => {
                        return(
                            <View>
                            <ListItem itemDivider>
                                <Text>{t.toUpperCase()}</Text>
                            </ListItem> 
                            {
                                this.state.users[t].length === 0 ? <Text style = {{textAlign : 'center' , color : '#808080' , marginVertical : 5}}>No Result Found!</Text>:
                                this.state.users[t].map(dataa => {
                                    return(
                                        <ListItem key = {dataa.gmail} onPress = {() => this.showActionSheet(dataa)}> 
                                            <Left>
                                                <Text>{dataa.first_name}{' '}{dataa.last_name}</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    )
                                })
                            }
                            </View>
                        )
                    })
                }
          </List>
        </Content>}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{color: '#505050', fontSize: 18 , fontWeight : 'bold'}}>Choose An Option</Text>}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={2}
          onPress = {(index) => this.actionEvent(index)}
        />

        <Footer navigation = {this.props.navigation}/>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
})