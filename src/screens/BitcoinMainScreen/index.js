import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import s from './styles';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as NAV_TYPES from '../../navigation/navTypes';

export default class BitcoinMain extends Component {

  render() {
    return (
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.txt}>
            Your Currencies
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(NAV_TYPES.BITCOIN_SEARCH)}>
            <Feather
              name={'plus-circle'}
              size={30}
              color="white"
              style={[{ paddingRight: 15 }, s.paddingBottom]}
            />
          </TouchableOpacity>
        </View>

        <View>

        </View>

      </View>
    )
  }
}
