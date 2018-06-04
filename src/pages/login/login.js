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

// import ScreenUtil from '../../utils/screenUtil'

export default class MineTab extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
  }
  // 登录
  _onLogin = () => {
    storage.save({
      key: 'loginState',
      data: {
        isFirst: false,
        isLogin: true
      }
    })
    this.props.navigation.navigate('AppStack')
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground  resizeMode={Image.resizeMode.cover} source={require('../../assets/img/login/login_bg.png')} style={styles.login_bg}>
          <Image style={styles.login_logo} source={require('../../assets/img/login/login_logo.png')}></Image>
          <Text style={styles.login_logo_name}>XIN KE BA</Text>
          <TouchableOpacity style={styles.login_button} activeOpacity={0.6}>
            <Image style={styles.login_button_icon} source={require('../../assets/img/login/login_weixin.png')}></Image>
            <Text style={styles.login_button_text} onPress={this._onLogin}>微信授权登录</Text>
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
    width: 90,
    height: 90,
    marginTop: 90
  },
  login_logo_name: {
    fontSize: 17,
    color: '#54D6E2',
    height: 20,
    marginTop: 12
  },
  login_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 78,
    width: 272,
    height: 46,
    borderWidth: 1,
    borderColor: '#1CCADA',
    borderRadius: 5,
    overflow: 'hidden'
  },
  login_button_icon: {
    width: 25,
    height: 19
  },
  login_button_text: {
    marginLeft: 6,
    fontSize: 17,
    color: '#1CCADA'
  }
});
