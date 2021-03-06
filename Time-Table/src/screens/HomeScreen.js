import React, { Component } from 'react';
import {StyleSheet ,TouchableOpacity , FlatList , Linking} from 'react-native';
import { Container, Content, Icon, Accordion, Text, View  , Button} from "native-base";
import Firebase from '../components/utils/firebase';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import FooterTab from '../components/Footer';
import LineBreak from '../components/LineBreak';
import { Entypo } from '@expo/vector-icons';

const dataArray = [
  { title: "Monday", content: ["10:15 AM - 11:15 AM    EE308","3:15 PM - 4:15 PM        HS301"] },
  { title: "Tuesday", content: ["9:00 AM - 10:00 AM        EE229","10:15 AM - 11:15 AM     EE301","2:00 PM - 3:00 PM         EE325","3:15 PM - 4:15 PM        HS301"] },
  { title: "Wednesday", content: ["10:15 AM - 11:15 AM     EE301","11:30 AM - 12:30 PM    EE308","3:15 PM - 4:15 PM        HS301"] },
  { title: "Thursday", content: ["9:00 AM - 10:00 AM        EE229","11:30 AM - 12:30 PM     EE325","2:00 PM - 3:00 PM         EE301"] },
  { title: "Friday", content: ["9:00 AM - 10:00 AM        EE229","10:15 AM - 11:15 AM     EE308","11:30 AM - 12:30 PM     EE325"] }
];

export default class HomeScreen extends Component{
    componentWillMount(){
       Firebase.database().ref('users/001').set({
           name : "Yash Parmar",
           age : '20'
       }).then(res => {
          
       })

       Firebase.database().ref('users').once('value' , data => {   //on
        
       })

       Firebase.database().ref('users/001').update({
           name : "yash"
       })
       Firebase.database().ref('users/001').remove();
    }
    
    _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "#A9DAD6" }}>
          <Text style={{ fontWeight: "600" }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
      }
      _renderContent(item) {
          
        return (
            <FlatList
            style = {{marginBottom : 10,marginTop : 10}}
            showsHorizontalScrollIndicator = {false}
            data = {item.content}
            renderItem = {({item}) => {
                return (
                    <TouchableOpacity>
                        <Text
                            style={{
                                backgroundColor: "#e3f1f1",
                                padding: 10,
                                fontStyle: "italic",
                              }}    
                        >{item}</Text>
                    </TouchableOpacity>
                )
            }}
        />
        );
      }
      render() {
        return (
            <View style = {styles.container}>
                <Header title = "Time Table" navigation = {this.props.navigation} show = {true} mssg = "Home"/>
                <Text style = {styles.heading}>Electrical Engineering</Text>
                <Text style = {styles.batch}>Batch 2018{' '} 
                     <Text style={{color: 'blue' , textDecorationLine : 'underline' , fontWeight : 'bold'}}
                        onPress={() => Linking.openURL('https://www.iitgoa.ac.in/')}>
                         IIT Goa
                    </Text> 
                </Text>
                <LineBreak text = "Semester V" w = {100}/>
                
                    <Text onPress = {() => this.props.navigation.navigate('TT' , {navi : this.props.navigation})}
                     style = {{marginTop : -15,textAlign : 'center' , fontWeight : 'bold',textDecorationLine :'underline'}}>View Full Time-Table</Text>
                <Container>
                    {/* <Header /> */}
                    
                    <Content padder style={{ backgroundColor: "white" , marginBottom : 10 }}>
                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />
                    </Content>
                    <TouchableOpacity 
                        onPress = {() => this.props.navigation.navigate('Courses')}
                        style = {{marginBottom : 50 , alignSelf : 'center'}}><Text style = {{textAlign : 'center', borderColor : 'black' , borderWidth : 1,padding : 10 , width : 180 , borderRadius : 30}}>Check Details</Text></TouchableOpacity>
                    <FooterTab navigation = {this.props.navigation}/>
                </Container>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff'
    },
    heading : {
        textAlign : 'center',
        fontSize : 30,
        fontWeight : '600',
        marginTop : 10
    },
    batch : {
        fontSize : 15,
        fontWeight : '300',
        textAlign : 'center',
        marginBottom : 30
    },
})

