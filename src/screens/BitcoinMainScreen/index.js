import React, { Component } from 'react'
import { 
  Text, 
  View, 
  TouchableOpacity, 
  AsyncStorage,
  ScrollView,
  Dimensions 
} from 'react-native'
import s from './styles';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as NAV_TYPES from '../../navigation/navTypes';
import Expandable from '../../components/ExpandableView';
import _ from 'lodash';



export default class BitcoinMain extends Component {

  state = {
    myCurrencies: [],
    itemExpanded: false
  }

  componentDidMount() {
    AsyncStorage.getItem('currencies')
      .then(res => JSON.parse(res))
      .then(result => this.setState(
        prevState => ({...prevState, myCurrencies: result})
      ))

    
  }

  async componentWillReceiveProps(nextProps) {
    
    if(!_.isUndefined(nextProps.navigation.state.params)) {
      if(!_.isUndefined(nextProps.navigation.state.params.shouldUpdate)) {
        if(nextProps.navigation.state.params.shouldUpdate) {
            let data = await AsyncStorage.getItem('currencies')
            if(data !== null) {
              let areEqual = data == JSON.stringify(this.state.myCurrencies);
              
              if(!areEqual) {
                this.setState(
                  prevState => ({...prevState, myCurrencies: JSON.parse(data)})
                )
              }

              return;
            }
        }
      }
    }
    return;
  }

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

        <ScrollView 
          style={{width: '100%'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            {
              this.state.myCurrencies !== [] ? 
                this.state.myCurrencies.map((item, i) => (
                  <Expandable key={i} item={item}/>
                ))
              :
                <Text>Currenly there are no currencies choosen</Text>
            }
          </View>
        </ScrollView>

      </View>
    )
  }
}
