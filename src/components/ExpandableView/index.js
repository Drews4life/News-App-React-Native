import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    YellowBox 
} from 'react-native';
import { fetchCurrencyGraph } from '../../actions/fetchCryptoActions';
import { connect } from 'react-redux';
import s from './styles';
import {
    VictoryChart,
    VictoryTheme,
    VictoryLine
} from "victory-native";
import _ from 'lodash';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Expandable extends Component {

    constructor(props) {
        super(props);
        this.state = {
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


    render() {
       console.log('props graph: ', this.props.graphData);
        return (
            <View style={s.container}>
                <TouchableOpacity onPress={() => this.setState(
                    prevState => ({ ...prevState, itemExpanded: !prevState.itemExpanded })
                )} >
                    <View style={s.eachCurrency}>
                        <Text style={s.currencyTxt}>{this.props.item}</Text>
                        <Text style={[s.currencyTxt, { marginRight: 15 }]}>{this.props.price}$</Text>
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
            </View>
        );
    }
}

mapStateToProps = state => ({
    graphData: state.fetchCrypto.cryptoData
})

mapDispatchToProps = dispatch => ({
    getGraphData: currency => dispatch(fetchCurrencyGraph(currency))
})

export default connect(mapStateToProps, mapDispatchToProps)(Expandable);