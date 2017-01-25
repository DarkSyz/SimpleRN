import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
    topContainer :{
        flex:1,
        flexDirection: 'column',
        marginTop:0,
        backgroundColor:'white'
    },
    emptyContainer:{
        flex:1,
        flexDirection: 'column',
        marginTop:0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },    
    spinner: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"transparent",
        justifyContent: "center",
        alignItems: "center",
    },    
    button: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius:5,
        padding: 10,
        margin:2
    },
    input:{
        height: 40
    },
    title:{
        fontSize: 16
    },
    subTitle:{
        fontSize: 10
    },
    content:{
        fontSize: 20,
        textAlign: 'center'
    },
    navButton: {
        padding: 4
    },
    navButtonText: {
        fontSize: 16,
        color: 'blue'
    },  
    navTitleText: {
        fontSize: 16
    },      
    tabBarStyle: {
            borderTopWidth : .5,
            borderColor    : '#b7b7b7',
            backgroundColor: 'white',
            opacity        : 1
        }   
});