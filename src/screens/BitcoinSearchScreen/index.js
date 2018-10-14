import React, { Component } from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity,  
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  AsyncStorage 
} from 'react-native'
import s from './style';
import { connect } from 'react-redux';
import { fetchCryptoList } from '../../actions/fetchCryptoActions';
import { Ionicons, Entypo } from '@expo/vector-icons';
import FilterInput from '../../components/Filter';
import * as NAV_TYPES from '../../navigation/navTypes';

class BitcoinSearch extends Component {

  state = {
    filter: '',
    refreshing: false
  }

  componentDidMount() {
    this.props.fetchCryptoList();
  }

  simulateFetch = () => {
    this.setState(prevState => ({
      ...prevState,
      refreshing: true
    }), () => setTimeout(
      () => this.setState(
        prevState => ({...prevState, refreshing: false})
      ), 1500)
    )
    
  }

  onFilterChange = value => this.setState(
    prevState => ({...prevState, filter: value})
  )

  fetchCurrency = async(item) => {
    // AsyncStorage.removeItem('currencies')
    let dataUnparsed = await AsyncStorage.getItem('currencies');
    let newData = [];

    if(dataUnparsed === null) {
      newData.push(item);
      AsyncStorage.setItem('currencies', JSON.stringify(newData))
        //.then();
    } else {
      console.log('unparsedData: ', dataUnparsed)
      let parsedData = JSON.parse(dataUnparsed);
      console.log('parsedData: ', parsedData);
      let doWeHaveSameAlready = false;
      
      parsedData.forEach(singleItem => {
        if(singleItem === item) doWeHaveSameAlready = true;
      });

      console.log('do we have same data? : ', doWeHaveSameAlready);
      if(!doWeHaveSameAlready) {
        parsedData.push(item)
        AsyncStorage.setItem('currencies', JSON.stringify(parsedData))
          //.then();
      } else {
        alert('Sorry, this item is already saved')
      }

    }
  }

  dynamicData = () => {
    if(this.state.filter.trim === '') return this.props.cryptoList;

    return this.props.cryptoList.filter(item => {
      if(item.toLowerCase().includes(this.state.filter.toLowerCase())) {
        return item
      }
    })
  }

  render() {
    console.log('is crypto loading: ', this.props.loading);
    return (
      <View style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(NAV_TYPES.BITCOIN_MAIN, {
            shouldUpdate: true
          })}>
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
        <FilterInput
          style={s.input}
          underlineColorAndroid={'transparent'}
          maxLength={35}
          value={this.state.filter}
          onChangeText={this.onFilterChange}
          placeholder={'Currency'}
          placeholderTextColor={'rgb(147, 146, 146)'}
          autocapitalize={false}
        />
        <View style={s.mainContainer}>
        {
            this.props.loading ? (
              <View style={{
                justifyContent: 'center', 
                alignItems: 'center',
                top: 100
              }}>
                <ActivityIndicator size='large' />
              </View>
            ) : (
              <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={this.dynamicData()}
                style={{ 
                  width: '100%', 
                  marginTop: 10, 
                }}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                refreshControl={
                    <RefreshControl 
                        tintColor="black"
                        onRefresh={this.simulateFetch}
                        refreshing={this.state.refreshing}
                    />
                }
                renderItem={({item}) => (
                    <View style={s.eachCurrency}>
                      <Text style={s.currencyTxt}>{item}</Text>
                      <TouchableOpacity onPress={() => this.fetchCurrency(`${item}`)}>
                          <Entypo
                            name='add-to-list'
                            size={35}
                            color='rgb(255,255,255)'
                            style={s.addBtn}
                          />
                      </TouchableOpacity>
                    </View>
                )}
              />
            )
          }
          </View>
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

// this.props.cryptoList.map((item, i) => {
//   return (
//     <Text key={i}> {item} </Text>
//   )
// })