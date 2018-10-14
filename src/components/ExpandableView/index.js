import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import s from './styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class componentName extends Component {
    state = {
        itemExpanded: false
    };
    render() {
        return (
            <View style={s.container}>
                <TouchableOpacity onPress={() => this.setState(
                    prevState => ({...prevState, itemExpanded: !prevState.itemExpanded})
                )} >
                    <View style={s.eachCurrency}>
                        <Text style={s.currencyTxt}>{this.props.item}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[{
                    width: width * 0.87,
                    height: this.state.itemExpanded ? height * 0.2 : 0
                }, s.expanded]}>
                    <Text>
                        Some Text
                    </Text>
                </View>
            </View>
        );
    }
}
