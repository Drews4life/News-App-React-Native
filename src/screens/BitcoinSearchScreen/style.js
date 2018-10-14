import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'rgb(10, 61, 145)',
        top: 0
    },
    txt: {
        alignSelf: 'center',
        textAlign: 'center',
        //marginRight: 150,
        paddingTop: 23,
        fontSize: 20,
        paddingRight: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white'
    },
    paddingBottom: {
        paddingBottom: 10,
    },
    input: {
        //backgroundColor: 'grey',
        flex: 1,
        paddingHorizontal: 10,
        color: 'black',
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
    addBtn: {
        paddingRight: 15
    },
    mainContainer: {
        width: deviceWidth,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});