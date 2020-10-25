import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    formContainer: {
        flexDirection: 'column',
        height: 100,
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'white',
    },
    buttoncss: {
        height: 40, 
        marginLeft: 30, 
        marginRight: 30, 
        marginTop: 10, 
        height: 50,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#FFC700',
        width: '85%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    entityButton: {
        fontSize: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    }
})