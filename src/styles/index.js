import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtWhite: {
        color: 'rgb(255, 255, 255)',
        fontSize: 25,
        fontWeight: '300',
        width: width * 0.8,
        alignSelf: 'center',
        textAlign: 'center'
    },
});