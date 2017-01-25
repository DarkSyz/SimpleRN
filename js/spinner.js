import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Spinner from 'react-native-loading-spinner-overlay';
import { Styles } from './styles';


var {
    height: deviceHeight,
    weight: deviceWeight
} = Dimensions.get("window");


export default class LoadingSpinner extends React.Component {
    static propTypes = {
        textContent: React.PropTypes.string,
    };
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

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    render(){
        return (
            <Animated.View style={[Styles.spinner,
                                  {transform: [{translateY: this.state.offset}]}]}>
                <Spinner textContent={this.props.textContent} visible />
            </Animated.View>
        );
    }
}