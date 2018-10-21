import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native'
import s from './styles';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as NAV_TYPES from '../../navigation/navTypes';
import { fetchCurrenciesPrices } from '../../actions/fetchCryptoActions';
import { getAllCurrenciesOffline } from '../../actions/getOfflineData'
import Expandable from '../../components/ExpandableView';
import FilterInput from '../../components/Filter';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');


class BitcoinMain extends Component {

  state = {
    myCurrencies: [],
    filter: '',
    refreshing: false
  }

  componentDidMount() {
    //AsyncStorage.removeItem('currencies')
    this.props.getCurrencies()
  }


  startIndicator = () => this.setState(
    prevState => ({ ...prevState, refreshing: true })
  )

  endIndicator = () => this.setState(
    prevState => ({ ...prevState, refreshing: false })
  )

  componentWillReceiveProps(nextProps) {
    if(!_.isUndefined(nextProps.cryptoPrices)) {
      console.log('cryptoprices: ', nextProps.cryptoPrices)
    }
  }

  getDynamicData = () => {
    if(this.state.filter.trim === '') return this.props.currencies;

    return this.props.currencies.filter(item => {
      if(item.toLowerCase().includes(this.state.filter.toLowerCase())) {
        return item;
      }
    })
  }

  render() {

    const { currencies } = this.props;

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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <FilterInput
            style={[s.input]}
            inputWrap={s.inputWrap}
            underlineColorAndroid={'transparent'}
            maxLength={35}
            value={this.state.filter}
            onChangeText={val => this.setState(
              prevState => ({ ...prevState, filter: val })
            )}
            placeholder={'Currency'}
            placeholderTextColor={'rgb(147, 146, 146)'}
            autocapitalize={false}
          />
          <TouchableOpacity onPress={this.props.getCurrencies}>
            <View style={s.buttonRefresh}>
              {this.state.refreshing ? (
                <ActivityIndicator
                  size='small'
                  color="white"
                />
              ) : (
                  <FontAwesome
                    name='refresh'
                    size={25}
                    color='white'
                  />
                )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ width: '100%', marginTop: 5 }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            {
              !_.isNull(currencies) && !_.isUndefined(currencies) && !_.isEmpty(currencies) ? (
                <FlatList 
                  keyExtractor={(item, index) => index.toString()}
                  data={this.getDynamicData()}
                  style={{ 
                    width: '100%', 
                    marginTop: 10, 
                  }}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}

                  renderItem={({item}) => {
                    let price = 0;
                    if(!_.isUndefined(this.props.cryptoPrices)) {
                      this.props.cryptoPrices.filter((priceItem) => {
                        if(!_.isUndefined(priceItem[item])) {
                          price = priceItem[item];
                        }
                      })
                    }

                    return (
                      <Expandable
                        item={item}
                        price={price} 
                      />
                  )

                  }
                }
                />
              )
                
              :
                <Text>Currenly there are no currencies choosen</Text>
            }
          </View>
        </ScrollView>

      </View>
    )
  }
}

mapStateToProps = state => ({
  cryptoPrices: state.fetchCrypto.cryptoPrices,
  currencies: state.getOfflineData.currencies
})

mapDispatchToProps = dispatch => ({
  fetchPrices: currencies => dispatch(fetchCurrenciesPrices(currencies)),
  getCurrencies: () => dispatch(getAllCurrenciesOffline())
})

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinMain);