import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux'
import { fetchNews } from '../../actions'
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome
} from '@expo/vector-icons'
import s from './styles';
import _ from 'lodash';
import {
    AdMobBanner
} from "expo";
import * as NAV_TYPES from '../../navigation/navTypes';

import NewsCard from '../../components/NewsCard';

const { width, height } = Dimensions.get('window');

class MainView extends Component {

    state = {
        currentRegion: 'us',
        isFetchingNews: false
    }

    componentDidMount() {
       // AsyncStorage.removeItem('name');
        AsyncStorage.getItem('region')
            .then(code => {
                //change this
                if (code !== null) {
                    this.setState({ currentRegion: code }, () => {
                        this.props.fetchNewsData(code);
                    })
                } else {
                    this.props.fetchNewsData();
                }
            })
    }

    simulateFetch = () => {
        this.setState({ isFetchingNews: true }, () => {
            setTimeout(() => {
                this.setState({ isFetchingNews: false })
            }, 500);
        })
    }

    renderNews = () => {
        const {
            dataLoaded,
            favourite,
            fetchingFavourite,
            fetchingNews
        } = this.props;


        if(fetchingNews){    
            if(!_.isUndefined(dataLoaded.articles)) {
                if(dataLoaded.totalResults === 0) {
                    return (
                        <Text style={{ fontSize: 20, top: 150 }}>Sorry We do not supply data for this region :(</Text>
                    );
                } else {
                    return (
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={dataLoaded.articles}
                            style={{ width: '100%', marginTop: 10 }}
                            refreshControl={
                                <RefreshControl 
                                    tintColor="black"
                                    onRefresh={this.simulateFetch}
                                    refreshing={this.state.isFetchingNews}
                                />
                            }
                            renderItem={({item}) => (
                                <NewsCard
                                    author={item.author}
                                    image={`${item.urlToImage}`}
                                    description={item.description}
                                    content={item.content}
                                    source={item.source.name}
                                    title={item.title}
                                    url={item.url}
                                    generalItemData={item}
                                />
                            )}
                        />
                    )
                }
            }
        } else if(fetchingFavourite) {
            if(!_.isUndefined(favourite)) {
                console.log('SKIP THE FLOWWWW');
                return (
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={favourite}
                        style={{ width: '100%', marginTop: 10 }}
                        refreshControl={
                            <RefreshControl 
                                tintColor="black"
                                onRefresh={this.simulateFetch}
                                refreshing={this.state.isFetchingNews}
                            />
                        }
                        renderItem={({item}) => {console.log('favs items: ', item); return(
                            <NewsCard
                                author={item.author}
                                image={`${item.urlToImage}`}
                                description={item.description}
                                content={item.content}
                                source={item.source.name}
                                title={item.title}
                                url={item.url}
                                generalItemData={item}
                            />
                        )}}
                    />
                )
            }
        } else {
            return (
                <ActivityIndicator
                    size={'large'}
                    color={'black'}
                    style={{ alignSelf: 'center', marginTop: 250 }}
                />
            )
        }
    }


    render() {

        const {
            dataLoaded,
            favourite,
            fetchingFavourite,
            fetchingNews,
            loading
        } = this.props;

        console.log('loading? : ', loading);

        return (
            <View
                style={s.container}
            >
                <View style={s.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <MaterialCommunityIcons
                            color="white"
                            name={'face-profile'}
                            size={30}
                            style={[{ paddingLeft: 15 }, s.paddingBottom]}
                        />
                    </TouchableOpacity>

                    <Text style={s.txt}>
                        Feed
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(NAV_TYPES.NEWS_SCREEN_SETTINGS)}>
                        <MaterialCommunityIcons
                            name={'settings'}
                            size={30}
                            color="white"
                            style={[{ paddingRight: 15 }, s.paddingBottom]}
                        />
                    </TouchableOpacity>
                </View>
                    <View style={{height: '85%'}}>
                    {
                        !loading ? this.renderNews() : (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '78%'
                            }}>
                                <TouchableOpacity>
                                    <View style={{
                                        // borderColor: 'black',
                                        // borderWidth: 1,
                                        // borderRadius: 200,
                                        // backgroundColor: 'rgba(5, 59, 145, 0.7)',
                                        width: width * .2,
                                        height: height * .09,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator size="small" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    </View>

                {/* <View style={{width: '100%', height: '6%'}}>
                    <AdMobBanner 
                        style={{flex: 1, }}
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-5005943924699126/2573483523"
                        // Test ID, Replace with your-admob-unit-id
                        //testDeviceID="EMULATOR"
                        didFailToReceiveAdWithError={() => console.log('failed')}
                    />
                </View> */}
            </View>
        );
    }
}



mapStateToProps = state => ({
    dataLoaded: state.fetchNews.news,
    favourite: state.fetchNews.favourite,
    fetchingNews: state.fetchNews.fetchingNews,
    fetchingFavourite: state.fetchNews.fetchingFavs,
    loading: state.fetchNews.loading
});

mapDispatchToProps = {
    fetchNewsData: fetchNews
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

