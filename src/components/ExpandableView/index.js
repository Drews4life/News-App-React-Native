import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    YellowBox,
    Modal,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { fetchCurrencyGraph } from '../../actions/fetchCryptoActions';
import { connect } from 'react-redux';
import s from './styles';
import {
    VictoryChart,
    VictoryTheme,
    VictoryLine
} from "victory-native";
import {
    AntDesign,
    MaterialIcons,
    MaterialCommunityIcons,
    Feather
} from '@expo/vector-icons';
import _ from 'lodash';
import { deleteCurrency } from '../../actions/getOfflineData';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Expandable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            itemExpanded: false,
            dataForGraph: [
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
            ],
            startingDate: '',
            endingDate: ''
        };
        console.disableYellowBox = true;
    }

    componentDidMount() {
        if (!_.isUndefined(this.props.item)) {
            this.props.getGraphData(this.props.item);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.graphData)) {
            this.setState(prevState => {
                let units = [];
                let startingDate = '';
                let endingDate = '';

                nextProps.graphData.forEach((item) => {
                    if (this.props.item === item.currency) {

                        startingDate = item.startingDate;
                        endingDate = item.endingDate;

                        item.data.map((prices, i) => {
                            units.push({ x: i, y: prices })
                        })
                    }
                })

                return {
                    ...prevState,
                    dataForGraph: units,
                    startingDate: startingDate,
                    endingDate: endingDate
                }
            })
        }
    }

    onDeletePress = itemName => {
        AsyncStorage.getItem('currencies')
            .then(unparsedResult => {
                let currencies = JSON.parse(unparsedResult);

                let excludedCurrenciesList = currencies.filter(item => item !== itemName);

                AsyncStorage.setItem('currencies', JSON.stringify(excludedCurrenciesList))
                    .then(() => {
                        this.setState(
                            prevState => ({
                                ...prevState,
                                openModal: false
                            })
                        )
                    }
                    )
            })
    }


    render() {
        return (
            <View style={s.container}>
                <TouchableOpacity
                    onLongPress={() => this.setState(
                        prevState => ({ ...prevState, openModal: true })
                    )}
                    onPress={() => this.setState(
                        prevState => ({ ...prevState, itemExpanded: !prevState.itemExpanded }),
                    () => {
                        if(this.state.itemExpanded) {
                            alert('yes')
                        }
                    })}
                >
                    <View style={s.eachCurrency}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={s.currencyTxt}>{this.props.item}</Text>
                            {
                                this.state.itemExpanded ? (
                                    <MaterialIcons
                                        name='expand-less'
                                        size={25}
                                        color='white'
                                    />
                                ) : (
                                        <MaterialIcons
                                            name='expand-more'
                                            size={25}
                                            color='white'
                                        />
                                    )
                            }
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.setState(
                                    prevState => ({ ...prevState, openModal: true })
                                )}
                            >
                                <Feather
                                    name='delete'
                                    size={25}
                                    color='white'
                                />
                            </TouchableOpacity>

                            {
                                this.props.isLoadingPrices ? (
                                    <ActivityIndicator 
                                        size='small'
                                        color='white'
                                        style={{marginHorizontal: 20}}
                                    />
                                ) : (
                                    <Text style={[s.currencyTxt, { marginRight: 15 }]}>{this.props.price}$</Text>
                                )
                            }                      
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[{
                    width: width * 0.87,
                    height: this.state.itemExpanded ? height * 0.4 : 0
                }, s.expanded]}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 13,
                            paddingTop: 5
                        }}
                    >
                        Starting period - {this.state.startingDate}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 13,
                            paddingTop: 5
                        }}
                    >
                        Ending period - {this.state.endingDate}
                    </Text>
                    <VictoryChart
                        width={width * 0.77}
                        height={this.state.itemExpanded ? height * 0.35 : 0}
                        theme={VictoryTheme.material}
                    >
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={this.state.dataForGraph}
                        />
                    </VictoryChart>
                </View>
                <Modal
                    animationType='fade'
                    visible={this.state.openModal}
                    transparent
                >
                    <View
                        style={{
                            backgroundColor: 'rgb(39, 83, 153)',
                            width: width * .75,
                            height: height * .25,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 9,
                            top: 250
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20
                            }}
                        >
                            Are you sure?
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.removeCurrency(this.props.item)
                                    this.setState(
                                        prevState => ({ ...prevState, openModal: false })
                                    )
                                }}
                            >
                                <MaterialIcons
                                    name='delete'
                                    size={40}
                                    color='white'
                                    style={{marginHorizontal: 25}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState(
                                prevState => ({ ...prevState, openModal: false })
                            )}>
                                <MaterialCommunityIcons
                                    name='close-box-outline'
                                    size={40}
                                    color='white'
                                    style={{marginHorizontal: 25, marginTop: 3}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

mapStateToProps = state => ({
    graphData: state.fetchCrypto.cryptoData,
    isLoadingPrices: state.fetchCrypto.loadingPrices
})

mapDispatchToProps = dispatch => ({
    getGraphData: currency => dispatch(fetchCurrencyGraph(currency)),
    removeCurrency: currency => dispatch(deleteCurrency(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(Expandable);