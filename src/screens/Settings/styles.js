import { StyleSheet, Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    countryButton: {
        width: deviceWidth * .5,
        height: deviceHeight * .05,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: 'white'
    },
    scrollWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderRadius: 2,
        borderColor: 'rgb(244, 66, 188)'
    },
    chooseRegion: {
        fontWeight: 'bold', 
        fontSize: 25,
        alignSelf: 'center',
        width: deviceWidth * 0.85,
        top: 5,
        left: 40
    },
    wrappingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    container: {
        width: '50%',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputWrapper: {
        height: deviceHeight * 0.05, 
        width: deviceWidth * 0.85,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.5,
        borderRadius: 10,
        borderColor: 'black',
        top: 100,
        backgroundColor: 'white'
    },
    input: {
        //backgroundColor: 'grey',
        flex: 1,
        paddingHorizontal: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    backButton:{
        width: deviceWidth * .65,
        height: deviceHeight * .08,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 13,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 4,
    }
})