import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
        paddingLeft: 90,
    },
    paddingBottom: {
        paddingBottom: 14,
    },
    input: {
        //backgroundColor: 'grey',
        flex: 1,
        paddingHorizontal: 10,
        color: 'black',
    },
    inputWrap: {
        width: deviceWidth * .7
    },
    buttonRefresh: {
        backgroundColor: 'rgb(10, 61, 145)',
        marginTop: 8,
        marginLeft: 10,
        width: deviceWidth * .15,
        height: deviceHeight * .05,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});