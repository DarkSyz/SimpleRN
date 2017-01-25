import React, { Component } from 'react';
import { Dimensions, Animated, View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: 'rgba(52,52,52,0.5)'
  },  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
};

const Screen1_1 = ()=> {
    return (
        <View style={Styles.container}>
            <Text style={Styles.welcome} onPress={Actions.a2}>Screen #1 - 1</Text>
            <Text style={Styles.welcome} onPress={Actions.modal_1}>Show Modal</Text>
        </View>
    );
};
const Screen1_2 = ()=> {
    return (
        <View style={Styles.container}>
            <Text style={Styles.welcome} >Screen #1 - 2</Text>
        </View>
    );
};
const Screen2_1 = ()=> {
    return (
        <View style={Styles.container}>
            <Text style={Styles.welcome} onPress={Actions.b2}>Screen #2 - 1</Text>
        </View>
    );
};

const Screen2_2 = ()=> {
    return (
        <View style={Styles.container}>
            <Text style={Styles.welcome}>Screen #2 - 2</Text>
        </View>
    );
};

const {
    height: deviceHeight,
    weight: deviceWeight
} = Dimensions.get("window");
export class Modal_1 extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal = () => {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }
    render = ()=> {
        return (
            <Animated.View style={[Styles.modalContainer,
                {transform: [{translateY: this.state.offset}]}]}>
                <Text style={{flex:1}} onPress={this.closeModal}>
                </Text>
                <View style={{flex:1, backgroundColor: 'blue'}}>
                    <Text style={Styles.welcome}>Modal</Text>
                    <Text style={Styles.welcome} onPress={this.closeModal}>Close</Text>
                </View>
            </Animated.View>
            );
    };
};


const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? (Platform.OS==='android'?0:20) : (Platform.OS==='android'?54:64);
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

// it must be defined after the referred components
export const App = ()=> {
    return (
    <Router getSceneStyle={getSceneStyle}>
    <Scene key="modal" component={Modal}>
        <Scene key='root'>
            <Scene key='tabbar' tabs={true} tabBarStyle={{backgroundColor:'#FFFFFF'}} >
                <Scene key="a" title="Tab 1" icon={TabIcon}>
                    <Scene key='a1' component={Screen1_1} icon={TabIcon} title='#1-1' initial/>
                    <Scene key='a2' component={Screen1_2} icon={TabIcon} title='#1-2'/>
                </Scene>
                <Scene key="b" title="Tab 2" icon={TabIcon}>
                    <Scene key='b1' component={Screen2_1} icon={TabIcon} title='#2 - 1' initial/>
                    <Scene key='b2' component={Screen2_2} icon={TabIcon} title='#2 - 2'/>
                </Scene>
            </Scene>
        </Scene>
        <Scene key='modal_1' direction='vertical' component={Modal_1} title='Modal' hideNavBar hideTabBar/>
    </Scene>
    </Router>
    );    
};