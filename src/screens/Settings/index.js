import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Dimensions
} from 'react-native';
import * as NAV_TYPES from '../../navigation/navTypes';
import { fetchNews } from '../../actions/fetchNewAction';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import s from './styles';
import countries from './countries.json';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            currentRegion: 'us'
        };
    }

    async componentDidMount() {
        const region = await AsyncStorage.getItem('region')

        if (region !== null) this.setState({ currentRegion: region })
    }

    onFilterChange = value => {
        this.setState({ filter: value })
    }

    onRegionChangeClick = code => {
        AsyncStorage.setItem('region', code)
            .then(() => this.setState({
                currentRegion: code,
                filter: ''
            }, () => {
                this.props.fetchNewsData(this.state.currentRegion);
            }))
    }

    render() {
        return (
            <View style={s.wrappingContainer}>
                <View style={s.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons
                            color="white"
                            name={'ios-arrow-round-back'}
                            size={60}
                            style={[{ paddingLeft: 15, marginTop: 22 }]}
                        />
                    </TouchableOpacity>

                    <Text style={s.chooseRegion}>
                        Choose your Region
                    </Text>
                </View>

                    <View
                        style={s.inputWrapper}
                    >
                        <TextInput
                            style={s.input}
                            underlineColorAndroid={'transparent'}
                            maxLength={35}
                            value={this.state.filter}
                            onChangeText={this.onFilterChange}
                            placeholder={'Region'}
                            placeholderTextColor={'rgb(147, 146, 146)'}
                        />
                        <FontAwesome
                            style={{ marginRight: 10 }}
                            name='search'
                            size={20}
                            color='rgb(147, 146, 146)'
                        />
                    </View>
                    <View style={s.currRegWrapper}>
                        <Text style={{ 
                            fontWeight: 'bold',
                            color: 'rgb(10, 61, 145)'
                        }}>
                        Current region: {this.state.currentRegion}
                        </Text>
                    </View>
                <ScrollView style={{
                    width: '85%',
                    height: '50%'
                }}>
                    <View style={s.scrollWrapper}>
                        {
                            countries.map((country, i) => {
                                if (country.name.includes(this.state.filter)) {
                                    return (
                                        <TouchableOpacity key={i} onPress={() => this.onRegionChangeClick(country.code)}>
                                            <View style={s.countryButton}>
                                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{country.name} : {country.code}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <View style={s.backButton}>
                        <Ionicons 
                            style={{
                                marginRight: 10,
                                marginTop: -3,
                            }}
                            name='ios-arrow-round-back' 
                            size={55} 
                            color='black'
                        />
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>Back to Feed</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

mapDispatchToProps = {
    fetchNewsData: fetchNews
}

export default connect(null, mapDispatchToProps)(Settings);

