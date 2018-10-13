import { StyleSheet } from 'react-native';

const colorW = 'black';

export default StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    header: {
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'rgb(10, 61, 145)',
        // borderWidth: 2,
        // borderColor: colorW,
        // borderRadius: 10,
        // marginTop: 25,
        // position: 'absolute',
        // top: 15
    },
    paddingBottom: {
        paddingBottom: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        alignSelf: 'center',
        textAlign: 'center',
        //marginRight: 150,
        paddingTop: 23,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white'
    }
})