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
    header: {
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(10, 61, 145)',
    },
    paddingBottom: {
        paddingBottom: 10,
    },
    scrollWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderRadius: 2,
        borderColor: 'rgb(244, 66, 188)',
        
    },
    chooseRegion: {
        fontStyle: 'italic', 
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        width: deviceWidth * 0.85,
        top: 13,
        left: 40,
        color: 'rgb(255,255,255)'
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
        width: deviceWidth * 0.90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1.3,
        borderRadius: 5,
        //borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'rgb(193, 193, 193)'
    },
    input: {
        //backgroundColor: 'grey',
        flex: 1,
        paddingHorizontal: 10,
        color: 'black',
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
    },
    currRegWrapper: {
        marginVertical: 10
    }
})