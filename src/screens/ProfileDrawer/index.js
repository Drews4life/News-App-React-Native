import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { fetchNews, fetchFavourite } from '../../actions';
import { 
    EvilIcons, 
    MaterialIcons, 
    Entypo,
    FontAwesome,
    Zocial,
    Foundation 
} from '@expo/vector-icons';
import s from './styles';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        TopSection: true,
        NYTimesSection: false,
        BitcoinSection: false,
        FavouriteSection: false,
        currentRegion: 'us'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('region').then(res => {
        this.setState({currentRegion: res || 'us'})
    })
  }

  onSectionChange = sectionNum => {
      if(sectionNum === 0) this.setState({
        TopSection: true,
        NYTimesSection: false,
        BitcoinSection: false,
        FavouriteSection: false
      }, () => {
        this.props.fetchNewsData(this.state.currentRegion);
      })

      if(sectionNum === 1) this.setState({
        TopSection: false,
        NYTimesSection: true,
        BitcoinSection: false,
        FavouriteSection: false
      }, () => {
        this.props.fetchNewsData(null, 'NYTimes');
      })

      if(sectionNum === 2) this.setState({
        TopSection: false,
        NYTimesSection: false,
        BitcoinSection: true,
        FavouriteSection: false
      }, () => {
        this.props.fetchNewsData(null, 'Bitcoin');
      })

      if(sectionNum === 3) this.setState({
        TopSection: false,
        NYTimesSection: false,
        BitcoinSection: false,
        FavouriteSection: true
      }, () => {
        this.props.fetchFavourite();
      })

      this.props.navigation.toggleDrawer();
  } 

  render() {
    return (
      <View style={s.container}>
        <View style={s.head}>
            <Text style={{
                fontWeight: 'bold', 
                fontSize: 35,
                color: 'white',
                fontStyle: 'italic'
            }}>
                Sections
            </Text>
        </View>
        <TouchableOpacity onPress={() => this.onSectionChange(0)}>
            <View style={s.sectionContainer}>
                <Entypo 
                    name="news"
                    color='white'
                    size={30}
                    style={{}}
                />
                <Text style={s.txtSection}>
                    Top-Headlines
                </Text>
                {this.state.TopSection ? (
                    <EvilIcons name="check" size={35} color={'white'}/>
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={25} color='white'/>
                )}
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onSectionChange(1)}>
            <View style={s.sectionContainer}>    
                <FontAwesome 
                    name="newspaper-o"
                    color='white'
                    size={30}
                    style={{}}
                />
                <Text style={s.txtSection}>
                    New-York Times
                </Text>
                {this.state.NYTimesSection ? (
                    <EvilIcons name="check" size={35} color={'white'}/>
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={25} color="white"/>
                )}
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onSectionChange(2)}>
            <View style={s.sectionContainer}>
                <Foundation 
                    name="bitcoin-circle"
                    color='white'
                    size={35}
                    style={{}}
                />
                <Text style={s.txtSection}>
                    Bitcoin
                </Text>
                {this.state.BitcoinSection ? (
                    <EvilIcons name="check" size={35} color={'white'}/>
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={25} color='white'/>
                )}
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onSectionChange(3)}>
            <View style={s.sectionContainer}>
                <MaterialIcons 
                    name="favorite"
                    color='white'
                    size={35}
                    style={{}}
                />
                <Text style={s.txtSection}>
                    Favourite
                </Text>
                {this.state.FavouriteSection ? (
                    <EvilIcons name="check" size={35} color={'white'}/>
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={25} color='white'/>
                )}
            </View>
        </TouchableOpacity>

      </View>
    );
  }
}


mapDispatchToProps = {
    fetchNewsData: fetchNews,
    fetchFavourite,
}

export default connect(null, mapDispatchToProps)(Profile);

