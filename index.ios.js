/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

//import { Root as App } from './js/components';
import { Root as App } from './js/router-flux';
//import { App } from './js/simple-router-flux';

AppRegistry.registerComponent('SimpleRN', () => App);
