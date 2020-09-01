import React , {Component} from 'react';
import {Image , View , Text} from 'react-native';

class TT extends Component {
    render(){
        return(
            <View>
                <Text style = {{fontSize : 30,marginTop : 20,textAlign : 'center' , fontWeight : 'bold',fontFamily : 'monospace'}}>Time-Table</Text>
                <Image source={require('../../assets/tt.jpeg')} style={{alignSelf : 'center',resizeMode : 'contain' , width : 300 , height : 800 , marginTop : -150}}/>
                <Text style = {{marginTop : -120 , textAlign : 'center' , fontSize : 15 , fontWeight : '400'}}>Credits</Text>
                <Text style = {{textAlign : 'center' , fontSize : 20 , fontWeight : 'bold'}}>Neeraj Krishnan K</Text>
                <Text style = {{textAlign : 'center' , color : '#808080'}}>Class Representative EE 2018</Text>

            </View>
        );
    }
}

export default TT;