import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

export default class FlashyBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            springValue: new Animated.Value(0.3),
            shouldAnimate: true
        }
    }

    spring = () => {
        this.state.springValue.setValue(0.3);
        Animated.spring(this.state.springValue, {
            toValue: 1,
            friction: 1
        }).start(() => this.spring())
    }

    onClick = () => {
        this.setState({ shouldAnimate: false })
    }

    componentDidMount() {
        this.spring();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasToStop) {
            console.log('it has to stop')
            this.onClick();
        }
    }

    render() {

        if (this.state.shouldAnimate === false) {
            return (
                this.props.children
            );
        }

        return (
            <Animated.View style={[{

            }, { transform: [{ scale: this.state.springValue }] }]}>
                {this.props.children}
            </Animated.View>
        );

    }
}

