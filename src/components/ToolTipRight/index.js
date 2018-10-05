import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    Modal,
    Animated 
} from 'react-native';

import s from './styles';

const deviceWidth = Dimensions.get('window').width;


export default class ToolTip extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalX: new Animated.Value(deviceWidth * .7)
    }  
  }


  componentWillReceiveProps(nextProps) {
      if(nextProps.isTipClicked) {
          console.log('appeared')
          this.openToolTip();
      }
  }

  openToolTip = () => {
    Animated.timing(this.state.modalX, {
        duration: 600,
        toValue: deviceWidth * .02 - 300
    }).start();
  }

  render() {
    return (
      <Animated.View style={[{
        flex: 1,
        position: 'absolute',
    }, 
      {
        transform: [{translateX: this.state.modalX}] 
      }
      ]}>
        <View style={s.container}>
            <Text style={s.txt}>{this.props.textTip}</Text>
        </View>
      </Animated.View>
    );
  }
}
