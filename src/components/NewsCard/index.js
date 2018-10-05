import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Modal,
    Dimensions,
    Image,
    ScrollView,
    Linking
} from 'react-native'
import s from './styles';
import _ from 'lodash';
import Entypo from '@expo/vector-icons/Entypo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class NewsCard extends React.PureComponent {
    state = { 
        modalVisible: false,
        saveButtonColor: 'black' 
    }

    goToUrl = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(this.props.url);
            } else {
              alert('Sorry, URL cant be find.')
            }
          });
    }

    render() {
        return (
            <View style={s.container}>
                <View style={{
                    width: '100%',
                    height: '55%'
                }}>
                    <ImageBackground
                        source={{ uri: this.props.image }}
                        style={{ flex: 1 }}
                    />
                </View>

                <View style={s.wrapper}>
                    <Text style={s.textTitle}>
                        {this.props.source}
                    </Text>

                    <Text style={s.description}
                    >
                        {
                            this.props.title
                            // _.isString(this.props.description) ? this.props.description.length > 150 ?
                            //     this.props.description.substring(0, 151) + '...'
                            //     :
                            //     this.props.description
                            //     : this.props.description

                        }
                    </Text>

                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                        <View style={s.btnMore}>
                            <Text style={s.btnMoreText}>
                                More
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    }}
                >
                    
                        <View style={s.modalArticleFull}>
                            <View style={s.imageWrapper}>
                                <Image
                                    source={{ uri: this.props.image }}
                                    style={s.imageItself}
                                />
                            </View>

                            <ScrollView style={{
                                width: '85%'
                            }}>    
                                <View style={{

                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontStyle: 'italic',
                                        marginTop: 5
                                    }}>
                                        Author: {this.props.author !== null ? this.props.author : this.props.source}
                                    </Text>

                                    <Text style={{
                                        marginTop: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        {this.props.description}
                                    </Text>

                                    <Text 
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: '800',
                                            marginTop: 15,
                                            color: 'blue'
                                        }}
                                        onPress={() => this.goToUrl(this.props.url)}
                                    >
                                        Source
                                    </Text>
                                </View>
                            </ScrollView>

                            <View style={{
                                flexDirection: 'row',

                            }}>
                                <TouchableOpacity onPress={() => this.setState({modalVisible: false})}>
                                    <Entypo name={'back'} size={45} style={s.iconBottom}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.setState(prevState => {
                                    let color = '';
                                    if(prevState.saveButtonColor === 'black') color = 'rgb(255, 17, 104)'
                                    if(prevState.saveButtonColor === 'rgb(255, 17, 104)') color = 'black'

                                    return {
                                        ...prevState,
                                        saveButtonColor: color
                                    }
                                })}>
                                    <Entypo name={'star'} size={40} color={this.state.saveButtonColor} style={s.iconBottom}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                </Modal>
            </View>
        )
    }
}

