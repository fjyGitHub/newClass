/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";

import ScreenUtil from '../../utils/screenUtil'

export default class MineTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground  resizeMode={Image.resizeMode.cover} source={require('../../assets/img/login_bg.png')} style={styles.login_bg}>
          <Image style={styles.login_logo} source={require('../../assets/img/login_logo.png')}></Image>
          <Text style={styles.login_logo_name}>XIN KE BA</Text>
          <TouchableOpacity style={styles.login_button} activeOpacity={0.6}>
            <Image style={styles.login_button_icon} source={require('../../assets/img/login_weixin.png')}></Image>
            <Text style={styles.login_button_text}>微信授权登录</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  login_bg: {
    flex: 1,
    alignItems: 'center'
  },
  login_logo: {
    width:ScreenUtil.scaleSize(90),
    height: ScreenUtil.scaleSize(90),
    marginTop: ScreenUtil.scaleSize(90)
  },
  login_logo_name: {
    fontSize: ScreenUtil.setSpText(17),
    color: '#54D6E2',
    height: ScreenUtil.scaleSize(20),
    marginTop: ScreenUtil.scaleSize(12)
  },
  login_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ScreenUtil.scaleSize(78),
    width: ScreenUtil.scaleSize(272),
    height: ScreenUtil.scaleSize(46),
    borderWidth: 1,
    borderColor: '#1CCADA',
    borderRadius: ScreenUtil.scaleSize(5),
    overflow: 'hidden'
  },
  login_button_icon: {
    width:ScreenUtil.scaleSize(25),
    height: ScreenUtil.scaleSize(19)
  },
  login_button_text: {
    marginLeft: ScreenUtil.scaleSize(6),
    fontSize: ScreenUtil.scaleSize(17),
    color: '#1CCADA'
  }
});
