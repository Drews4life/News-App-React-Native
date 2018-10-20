import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import s from './styles';

export default class Filter extends Component {


  render() {
    return (
        <View
        style={[s.inputWrapper, this.props.inputWrap]}
    >
        <TextInput
            {...this.props}
        />
        <FontAwesome
            style={{ marginRight: 10 }}
            name='search'
            size={20}
            color='rgb(147, 146, 146)'
        />
    </View>
    );
  }
}
