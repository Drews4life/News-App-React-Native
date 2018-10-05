import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';

import * as NAV_TYPES from '../../navigation/navTypes';
import { Ionicons, Entypo } from '@expo/vector-icons';
import s from './styles';

import ToolTip from '../../components/ToolTipRight';
import FlashyBtn from '../../components/FlashyButton';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class WelcomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFirstClicked: false,
            isSecondClicked: false,
            isThirdClicked: false,
            shouldAnimStop: false,
            posYfirstScreen: new Animated.Value(deviceHeight),
            posYsecondScreen: new Animated.Value(deviceHeight),
            isLoading: true
        }

    }

    async componentDidMount() {
        const name = await AsyncStorage.getItem('name');

        if (name === null) {
            console.log('we should show welcome screen');
            this.setState({isLoading: false}, () => {
                this.toggleWelcomeSign();
            })
        } else {
            console.log('we should move to the main flow')
            this.props.navigation.navigate(NAV_TYPES.MAIN_FLOW);
        }
    }

    toggleWelcomeSign = () => {
        Animated.timing(this.state.posYfirstScreen, {
            duration: 800,
            toValue: deviceHeight * .03
        }).start();
    }

    toggleContinueNavigationBtn = () => {
        Animated.timing(this.state.posYsecondScreen, {
            duration: 900,
            toValue: deviceHeight * .1
        }).start();
    }

    onNextButton = () => {
        this.props.navigation.navigate(NAV_TYPES.SIGN_IN);
    }

    render() {
        const {
            isFirstClicked,
            isSecondClicked,
            isThirdClicked
        } = this.state;

        if (isFirstClicked && isSecondClicked && isThirdClicked) {
            this.toggleContinueNavigationBtn()
        }

        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 255, 255)',
                }}>
                    <ActivityIndicator
                        size='large'
                        color='rgb(165, 140, 39)'
                        
                    />
                </View>
            )
        }

        return (
            <ScrollView
                style={s.scrollContainer}
                pagingEnabled
                horizontal
            >
                <View style={[s.commonContainer, {
                    backgroundColor: 'rgb(255, 255, 255)',
                }]}>
                    <Animated.View style={{
                        transform: [{ translateY: this.state.posYfirstScreen }]
                    }}>
                        <Entypo 
                            name='star-outlined' 
                            size={150} 
                            color='rgb(165, 140, 39)'
                            style={{alignSelf: 'center'}}
                        />
                        <View style={{
                            borderWidth: 3,
                            borderRadius: 25,
                            borderColor: 'rgb(165, 140, 39)',
                            marginHorizontal: 25
                        }}>
                            <Text style={[s.txtWhite, { fontSize: 45 }]}>
                                Welcome there!
                            </Text> 
                        </View>
                        <Text style={[s.txtWhite, { fontSize: 15, marginTop: 35 }]}>
                                Swipe-Swipe :)
                        </Text>
                    </Animated.View>
                </View>

                <View style={[s.commonContainer, {
                    backgroundColor: 'rgb(255, 255, 255)',
                    flexDirection: 'row',
                    alignItems: 'center'
                }]}>
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Entypo 
                                name='star-outlined' 
                                size={150} 
                                color='rgb(165, 140, 39)'
                                style={{
                                    alignSelf: 'center',
                                }}
                            />
                            <Text style={[s.txtWhite, { fontSize: 15, fontWeight: 'bold' }]}>
                                Touch each Tint :P
                            </Text>
                        </View>
                    <Animated.View style={{
                        transform: [{ translateY: this.state.posYsecondScreen }]
                    }}>


                        <Text style={[s.txtWhite, s.textNextToArrow]}>
                            Nice! Lets go together?
                    </Text>
                    </Animated.View>
                    <View style={s.wrappingTouchables}>
                        <FlashyBtn
                            hasToStop={this.state.shouldAnimStop}
                        >
                            <TouchableOpacity
                                onPress={() => this.setState({ shouldAnimStop: true }, () => this.setState({ isFirstClicked: true }))}
                            >
                                <View style={[s.touchable, { borderColor: 'rgb(76, 52, 59)' }]}>
                                    <Ionicons
                                        name={'ios-arrow-round-back'}
                                        size={55}
                                        color={'rgb(76, 52, 59)'}
                                        style={{ marginTop: -15 }}
                                    />
                                </View>

                                <ToolTip
                                    isTipClicked={this.state.isFirstClicked}
                                    textTip='We hope that you will enjoy our app.'
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ shouldAnimStop: true }, () => this.setState({ isSecondClicked: true }))}
                            >
                                <View style={[s.touchable, { borderColor: 'rgb(76, 52, 59)' }]}>
                                    <Ionicons
                                        name={'ios-arrow-round-back'}
                                        size={55}
                                        color={'rgb(76, 52, 59)'}
                                        style={{ marginTop: -15 }}
                                    />
                                </View>
                                <ToolTip
                                    isTipClicked={this.state.isSecondClicked}
                                    textTip='We are happy to see you anytime :)'
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.setState({ shouldAnimStop: true }, () => this.setState({ isThirdClicked: true }))}
                            >

                                <View style={[s.touchable, { borderColor: 'rgb(76, 52, 59)' }]}>
                                    <Ionicons
                                        name={'ios-arrow-round-back'}
                                        size={55}
                                        color={'rgb(76, 52, 59)'}
                                        style={{ marginTop: -15 }}
                                    />
                                </View>
                                <ToolTip
                                    isTipClicked={this.state.isThirdClicked}
                                    textTip='Are you ready for the journey?'
                                />
                            </TouchableOpacity>
                        </FlashyBtn>
                        <Animated.View style={{
                            transform: [{ translateY: this.state.posYsecondScreen }]
                        }}>
                            <TouchableOpacity onPress={this.onNextButton}>
                                <View style={s.touchable}>
                                    <Ionicons
                                        name={'ios-arrow-round-forward'}
                                        size={55}
                                        color={'rgb(165, 140, 39)'}
                                        style={{ marginTop: -15 }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
