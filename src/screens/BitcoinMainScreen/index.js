import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import s from './styles';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as NAV_TYPES from '../../navigation/navTypes';
import { fetchCurrenciesPrices } from '../../actions/fetchCryptoActions';
import Expandable from '../../components/ExpandableView';
import FilterInput from '../../components/Filter';
import _ from 'lodash';



class BitcoinMain extends Component {

  state = {
    myCurrencies: [],
    filter: '',
    refreshing: false
  }

  componentDidMount() {
    //AsyncStorage.removeItem('currencies')
    AsyncStorage.getItem('currencies')
      .then(res => JSON.parse(res))
      .then(result => this.setState(
        prevState => ({ ...prevState, myCurrencies: result }), () => {
          const { myCurrencies } = this.state;
          if (!_.isNull(myCurrencies) && !_.isUndefined(myCurrencies) && !_.isEmpty(myCurrencies)) {
            console.log('is called with: ', this.state.myCurrencies)
            this.props.fetchPrices(this.state.myCurrencies);
          }
        })
      )


  }

  refreshItems = async () => {

    this.startIndicator();

    let data = await AsyncStorage.getItem('currencies')
    if (data !== null) {

      this.props.fetchPrices(JSON.parse(data));

      let areEqual = data == JSON.stringify(this.state.myCurrencies);

      if (!areEqual) {
        this.setState(
          prevState => ({ ...prevState, myCurrencies: JSON.parse(data) })
        )
        this.endIndicator();
      }
      this.endIndicator();
      return;
    }


    this.endIndicator();
    return;
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

  render() {

    const { myCurrencies } = this.state;

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
          <TouchableOpacity onPress={this.refreshItems}>
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
              !_.isNull(myCurrencies) && !_.isUndefined(myCurrencies) && !_.isEmpty(myCurrencies) ?
                this.state.myCurrencies.map((item, i) => {
                  let price = 0;
                  if(!_.isUndefined(this.props.cryptoPrices)) {
                    this.props.cryptoPrices.filter((priceItem) => {
                      if(!_.isUndefined(priceItem[item])) {
                        price = priceItem[item];
                      }
                    })
                  }
                  console.log('price: ', price)
                  if (item.includes(this.state.filter)) {
                    return (
                      <Expandable 
                        key={i} 
                        item={item}
                        price={price} 
                      />
                    )
                  }
                })
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
  cryptoPrices: state.fetchCrypto.cryptoPrices
})

mapDispatchToProps = dispatch => ({
  fetchPrices: currencies => dispatch(fetchCurrenciesPrices(currencies))
})

export default connect(mapStateToProps, mapDispatchToProps)(BitcoinMain);