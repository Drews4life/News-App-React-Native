import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    inputWrapper: {
        height: deviceHeight * 0.05, 
        width: deviceWidth * 0.90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1.3,
        borderRadius: 5,
        //borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'rgb(193, 193, 193)'
    }
})