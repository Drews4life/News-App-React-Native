import { StyleSheet } from 'react-native';

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
    }
});