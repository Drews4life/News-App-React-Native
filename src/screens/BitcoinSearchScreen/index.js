import React, { Component } from 'react'
import { Text, View, TouchableOpacity,  FlatList, ActivityIndicator } from 'react-native'
import s from './style';
import { connect } from 'react-redux';
import { fetchCryptoList } from '../../actions/fetchCryptoActions';
import { Ionicons } from '@expo/vector-icons'

class BitcoinSearch extends Component {
  componentDidMount() {
    this.props.fetchCryptoList();
  }

  render() {
    console.log('is crypto loading: ', this.props.loading);
    return (
      <View style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              color="white"
              name={'ios-arrow-round-back'}
              size={60}
              style={[{ paddingLeft: 15, marginTop: 22 }]}
            />
          </TouchableOpacity>

          <Text style={s.txt}>
            Choose preferred currency
          </Text>
        </View>
        {
            this.props.loading ? (
              <View style={{
                justifyContent: 'center', 
                alignItems: 'center',
                top: 100
              }}>
                <ActivityIndicator size='large' />
              </View>
            ) : this.props.cryptoList.map((item, i) => {
                  return (
                    <Text key={i}> {item} </Text>
                  )
            })
          }
      </View>
    )
  }
}

mapStateToProps = state => ({
  loading: state.fetchCrypto.loading,
  cryptoList: state.fetchCrypto.cryptoList
})

mapDispatchToProps = dispatch => ({
  fetchCryptoList: () => dispatch(fetchCryptoList())
})

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinSearch);