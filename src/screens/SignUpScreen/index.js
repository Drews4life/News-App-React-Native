import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    AsyncStorage,
    ImageBackground,
    Dimensions
} from 'react-native';
import localStyles from './styles';
import globalStyles from '../../styles';
import * as NAV_TYPES from '../../navigation/navTypes';
import { Entypo } from '@expo/vector-icons'

import bluefade from '../../../assets/bluefade.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default class SignUp extends Component {
    state = {
        inputName: '',
        textLength: 0,
        showError: false
    }

    showError = () => {
        this.setState({ showError: true })
    }

    logginSuccess = () => {
        AsyncStorage.setItem('name', this.state.inputName)
            .then(() => {
                this.props.navigation.navigate(NAV_TYPES.MAIN_FLOW);
            })
    }

    render() {
        return (
            <KeyboardAvoidingView style={localStyles.container} behavior="padding" enabled>
                <ImageBackground
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                        //resizeMode: 'wrap',
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                    source={require('../../../assets/bluefade2.png')}
                >
                    <View style={[globalStyles.container, {
                        //backgroundColor: 'rgb(255, 255, 255)'
                    }]}>
                        <Entypo
                            name='star-outlined'
                            size={150}
                            color='rgba(255, 255, 255, 0.4)'
                            style={{
                                alignSelf: 'center',
                                position: 'absolute',
                                top: 5
                            }}
                        />
                        <View style={localStyles.wrap}>
                            <TextInput
                                style={localStyles.input}
                                placeholder="Your name"
                                placeholderTextColor='rgb(255, 255, 255)'
                                value={this.state.inputName}
                                onChangeText={val => this.setState(prevState => {
                                    return {
                                        inputName: val,
                                        textLength: val.length,
                                        showError: false
                                    }
                                })}
                            />

                            {this.state.showError ? (
                                <Text style={localStyles.error}>
                                    Your name is too short!
                        </Text>
                            ) : null}

                            <TouchableOpacity
                                onPress={() => {
                                    this.state.textLength < 5 ? this.showError() : this.logginSuccess()
                                }}
                            //disabled={this.state.textLength > 5 ? false : true}
                            >
                                <View style={localStyles.touchable}>
                                    <Text style={[globalStyles.txtWhite, {
                                        marginVertical: 2
                                    }]}>Go on!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}
