import React, { Component } from 'react'; import { View, Text, Image } from 'react-native';

export default class TabIcon extends Component {
  static propTypes = {
    selected: React.PropTypes.bool,
    title: React.PropTypes.string,
    sceneKey: React.PropTypes.string
  };

  constructor(props){
    super(props);
    this.data={
      'home': {
        title: 'Home',
        icon: require('../images/ic_favorite.png'),
      },
      'favorites': {
        title: 'Favorites',
        icon: require('../images/ic_favorite.png'),
      }
    };
  }

  render(){
    let param = this.data[this.props.sceneKey];
    let activeStyle= { color: this.props.selected ? 'red' : 'black' };
    return (
      <View style={{alignItems:'center'}}>
        <Image source={param.icon} style={{height: 25, width: 25}}/>
        <Text style={activeStyle}>{param.title}</Text>
      </View>
    );
  }
};
