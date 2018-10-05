import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        height: height * .5,
        width: width * .95,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: 'black',
        marginTop: 10
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        //paddingTop: 2

    },
    textDescription: {
        fontWeight: '800',
        fontSize: 14,
        //paddingTop: 2
    },
    wrapper: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 55,
    },
    btnMore: {
        backgroundColor: 'rgb(255, 17, 104)',
        height: '40%',
        width: width * .4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20
    },
    btnMoreText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    modalArticleFull: {
        position: 'absolute',
        bottom: 70,
        backgroundColor: 'white',
        width: width * 0.85,
        height: height * 0.85,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3
    },
    imageWrapper: {
        width: '95%',
        height: '35%',
        alignContent: 'center',
        marginTop: 5,
    },
    imageItself: { 
        flex: 1, 
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'black'
    },
    iconBottom: {
        marginHorizontal: 35,
    }
});