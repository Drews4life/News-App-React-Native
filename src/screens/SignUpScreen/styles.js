import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: '80%',
        height: height * 0.07,
        borderRadius: 25,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 2,
        backgroundColor: 'rgba(61, 94, 150, 0.65)',
        paddingHorizontal: 15,
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: 15
    },
    touchable: {
        marginTop: 30,
        width: width * 0.6,
        height: height * 0.07,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(61, 94, 150, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    error: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10
    },
    wrap: {
        borderWidth: 3,
        borderRadius: 11,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        width: width * .9,
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(61, 94, 150, 0.65)',
        marginTop: 70
    }
});