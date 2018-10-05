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
    FlatList
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

import NewsCard from '../../components/NewsCard';

const { width, height } = Dimensions.get('window');

class MainView extends Component {

    state = {
        currentRegion: 'us',
        isFetchingNews: false
    }

    componentDidMount() {
        AsyncStorage.removeItem('name');
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
            }, 2500);
        })
    }


    render() {
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
                    {/* <TouchableOpacity onPress={this.simulateFetch}>
                        <FontAwesome
                            name={'refresh'}
                            size={30}
                            style={[{ paddingRight: 15 }, s.paddingBottom]}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={{height: '78%'}}>
                {
                    !_.isUndefined(this.props.dataLoaded.articles) ?
                        this.props.dataLoaded.totalResults === 0 ? (
                            <Text style={{ fontSize: 20, top: 150 }}>Sorry We do not supply data for this region :(</Text>
                        ) : (
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.dataLoaded.articles}
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
                                        />
                                    )}
                                />
                            )
                        : (
                            <ActivityIndicator
                                size={'large'}
                                color={'black'}
                                style={{ alignSelf: 'center', marginTop: 250 }}
                            />
                        )
                }
                </View>

                {/* <ScrollView 
                    style={{ width: '100%', marginTop: 10 }} 
                    refreshControl={
                        <RefreshControl 
                            tintColor="black"
                            onRefresh={this.simulateFetch}
                            refreshing={this.state.isFetchingNews}
                        />
                    }>
                    <View style={s.content}>
                        {
                            !_.isUndefined(this.props.dataLoaded.articles) ?
                                this.props.dataLoaded.totalResults === 0 ? (
                                    <Text style={{ fontSize: 20, top: 150 }}>Sorry We do not supply data for this region :(</Text>
                                ) : this.props.dataLoaded.articles.map((post, i) => {
                                    if (post.urlToImage) {
                                        return (
                                            <NewsCard
                                                key={i}
                                                author={post.author}
                                                image={`${post.urlToImage}`}
                                                description={post.description}
                                                content={post.content}
                                                source={post.source.name}
                                                title={post.title}
                                                url={post.url}
                                            />
                                        )
                                    }
                                })
                                : (
                                    <ActivityIndicator
                                        size={'large'}
                                        color={'black'}
                                        style={{ alignSelf: 'center', marginTop: 250 }}
                                    />
                                )
                        }
                    </View>
                </ScrollView> */}
                <View style={{width: '100%', height: '6%'}}>
                    <AdMobBanner 
                        style={{flex: 1, }}
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-5005943924699126/2573483523"
                        // Test ID, Replace with your-admob-unit-id
                        testDeviceID="EMULATOR"
                        didFailToReceiveAdWithError={() => console.log('failed')}
                    />
                </View>
            </View>
        );
    }
}



mapStateToProps = state => ({
    dataLoaded: state.fetchNews.news
});

mapDispatchToProps = {
    fetchNewsData: fetchNews
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

