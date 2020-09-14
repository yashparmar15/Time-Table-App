import React , {Component} from 'react';
import {Image , View , Text , Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


class TT extends Component {
    render(){
        return(
            <View>
                <TouchableOpacity style = {{marginLeft : 10}}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="black" onPress = {() => this.props.navigation.navigate('Home')} />
                </TouchableOpacity>
                <Text style = {{fontSize : 30,marginTop : 40,textAlign : 'center' , fontWeight : 'bold',fontFamily : 'monospace'}}>Time-Table</Text>
                <Image source={require('../../assets/tt.jpeg')} style={{alignSelf : 'center',resizeMode : 'contain' , width : 300 , height : 800 , marginTop : -150}}/>
                <Text style = {{marginTop : -120 , textAlign : 'center' , fontSize : 15 , fontWeight : '400'}}>Credits</Text>
                <Text style = {{textAlign : 'center' , fontSize : 20 , fontWeight : 'bold'}}>Neeraj Krishnan K</Text>
                <Text style = {{textAlign : 'center' , color : '#808080'}}>Ex Class Representative EE 2018</Text>
            </View>
        );
    }
}

export default TT;