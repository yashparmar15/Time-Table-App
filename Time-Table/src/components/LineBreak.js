import React, { Component } from 'react';
import {View , Text} from 'react-native';


class LineBreak extends Component {
    render(){
        return (
            <View style={{flexDirection: 'row', alignItems: 'center',marginBottom : 20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: this.props.w, textAlign: 'center'}}>{this.props.text}</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    </View>
        )
    }
}

export default LineBreak;