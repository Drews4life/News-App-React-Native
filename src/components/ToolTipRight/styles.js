import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    animView: {
        flex: 1,
        position: 'absolute',
    },
    container: {
        height: deviceHeight * .1,
        width: deviceWidth * .7,
        backgroundColor: 'rgb(92, 88, 96)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 30,
    },
    txt: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'rgb(255,255,255)'
    }
});