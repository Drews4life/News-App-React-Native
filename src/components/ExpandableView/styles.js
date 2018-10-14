import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


export default StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2
    },
    eachCurrency: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(10, 61, 145, .7)',
        width: deviceWidth * .9,
        height: deviceHeight * .08,
        marginTop: 5,
    },
    currencyTxt: {
        paddingLeft: 10,
        color: 'rgb(255,255,255)',
        fontWeight: 'bold',
        fontSize: 15
    },
    expanded: {
        backgroundColor: 'rgba(10, 61, 145, .4)',
        justifyContent: 'center',
        alignItems: 'center',
    }
})