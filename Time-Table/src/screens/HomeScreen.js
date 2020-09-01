import React, { Component } from 'react';
import {StyleSheet ,TouchableOpacity , FlatList} from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View} from "native-base";
const dataArray = [
  { title: "Monday", content: ["10:15 AM - 11:15 AM    EE308","3:15 PM - 4:15 PM        HS301"] },
  { title: "Tuesday", content: ["9:00 AM - 10:00 AM        EE229","10:15 AM - 11:15 AM     EE301","2:00 PM - 3:00 PM         EE325","3:15 PM - 4:15 PM        HS301"] },
  { title: "Wednesday", content: ["10:15 AM - 11:15 AM     EE301","11:30 AM - 12:30 PM    EE308","3:15 PM - 4:15 PM        HS301"] },
  { title: "Thrusday", content: ["9:00 AM - 10:00 AM        EE229","11:30 AM - 12:30 PM     EE325","2:00 PM - 3:00 PM         EE301"] },
  { title: "Friday", content: ["9:00 AM - 10:00 AM        EE229","10:15 AM - 11:15 AM     EE308","11:30 AM - 12:30 PM     EE325"] }
];

class HomeScreen extends Component{
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
                <Text style = {styles.heading}>Electrical Engineering</Text>
                <Text style = {styles.batch}>Batch 2018{' '} 
                     <Text style={{color: 'blue' , textDecorationLine : 'underline'}}
                        onPress={() => Linking.openURL('https://www.iitgoa.ac.in/')}>
                         IIT Goa
                    </Text> 
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center',marginBottom : 20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: 100, textAlign: 'center'}}>Semester V</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    </View>
                <Container>
                    {/* <Header /> */}
                    
                    <Content padder style={{ backgroundColor: "white" }}>
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
                        style = {{marginBottom : 100 , alignSelf : 'center'}}><Text style = {{textAlign : 'center', borderColor : 'black' , borderWidth : 1,padding : 10 , width : 180 , borderRadius : 30}}>Check Details</Text></TouchableOpacity>
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
        marginTop : 50
    },
    batch : {
        fontSize : 15,
        fontWeight : '300',
        textAlign : 'center',
        marginBottom : 30
    }
})

export default HomeScreen;