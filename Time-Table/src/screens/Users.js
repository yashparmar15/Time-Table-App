import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, List, ListItem, Text  ,Left , Right , Icon} from 'native-base';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'


// var BUTTONS = [
//     { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4"},
//     { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
//     { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
//     { text: "Delete", icon: "trash", iconColor: "#fa213b" },
//     { text: "Cancel", icon: "close", iconColor: "#25de5b" }
//   ];
//   var DESTRUCTIVE_INDEX = 3;
//   var CANCEL_INDEX = 4;

const options = [
    'Cancel', 
    'Apple', 
    <Text style={{color: 'yellow'}}>Banana</Text>,
    'Watermelon', 
    <Text style={{color: 'red'}}>Durian</Text>
  ]

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

      showActionSheet = () => {
        this.ActionSheet.show()
      }
    openActionSheet = () => {
        ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: "Choose An Action",
              cssClass : 'center'
            },
            buttonIndex => {
              this.setState({ clicked: BUTTONS[buttonIndex] });
            }
          )
    }
  render() {
    return (
      <Container>
        <Header show = {true} navigation = {this.props.navigation} title = "All Users"/>
        <Content>
          <List>
            <ListItem itemDivider >
              <Text>A</Text>
            </ListItem>                    
            <ListItem onPress = {this.showActionSheet}>
            <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" 
                 />
              </Right>
            </ListItem>
            <ListItem>
            <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem> 
            <ListItem> 
            <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
              </ListItem>
          </List>
        </Content>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{color: '#000', fontSize: 18}}>Which one do you like?</Text>}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={(index) => { /* do something */ }}
        />

        <Footer navigation = {this.props.navigation}/>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    center : {
        backgroundColor : 'black'
    }
})