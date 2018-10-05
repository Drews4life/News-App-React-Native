import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgb(70, 114, 186)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderBottomWidth: 1,
        //borderRadius: 8,
        borderBottomColor: 'white',
        width: width * 0.7,
        height: height * 0.05,
        marginTop: 5,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    txtSection: {
        fontSize: 20,
        marginHorizontal: 15,
        color: 'white'
    },
    head: {
        position: 'absolute',
        top: 30,
        borderColor: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        //borderRadius: 10,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});