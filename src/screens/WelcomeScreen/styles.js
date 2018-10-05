import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    commonContainer: {
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'center',
        
    },
    txtWhite: {
        color: 'rgb(165, 140, 39)',
        fontSize: 25,
        fontWeight: '300',
        width: deviceWidth * 0.8,
        alignSelf: 'center',
        textAlign: 'center'
    },
    touchable: {
        borderColor: 'rgb(165, 140, 39)',
        borderWidth: 4,
        borderRadius: 5,
        width: '100%',
        height: deviceHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        
    },
    wrappingTouchables: {
        height: deviceHeight,
        width: deviceWidth * 0.15,
        justifyContent: 'center',
        marginTop: 15
    },
    textNextToArrow: {
        top: 152,
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    iconColor: {
        color: 'rgb(41, 90, 170)'
    }
});