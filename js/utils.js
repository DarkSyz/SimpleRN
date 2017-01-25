import React from 'react';
import ReactNative from 'react-native';

const iOSDeviceMarginTop = 22;

export default class Utils{
  static log(s){
    console.log(s);
  }
  static isIOS(){
    return ReactNative.Platform.OS === 'ios';
  }

  static isAndroid(){
    return ReactNative.Platform.OS === 'android';
  }

  static getDeviceMarginTop(){
    return this.isIOS() ? iOSDeviceMarginTop : 0;
  }
}