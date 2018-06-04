import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
}from 'react-native';

import Swiper from 'react-native-swiper';
import {NavigationActions} from 'react-navigation';
export default  class Guide extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
  }
  _onLoginClick = ()=> {
    //  保存首次引导页
    storage.save({
      key: 'loginState',
      data: {
        isFirst: false,
        isLogin: false
      }
    })
    this.props.navigation.navigate('LoginStack')
  }
  render() {
    return (
      <Swiper style={styles.wrapper} showsPagination={false} loop={false}>
        <View style={styles.slide}>
          <Image
            style={styles.icon}
            resizeMode={Image.resizeMode.contain}
            source={require('../../assets/img/guide/guide_1.jpg')}/>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.icon}
            resizeMode={Image.resizeMode.contain}
            source={require('../../assets/img/guide/guide_2.jpg')}/>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.icon}
            resizeMode={Image.resizeMode.contain}
            source={require('../../assets/img/guide/guide_3.jpg')}/>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.icon}
            resizeMode={Image.resizeMode.contain}
            source={require('../../assets/img/guide/guide_4.jpg')}/>
          <Text style={styles.button} onPress={this._onLoginClick.bind(this)}></Text>
        </View>
      </Swiper>
    );
  }
  componentWillMount() {
    storage.load({key: 'loginState'}).then(result => {
      if (!result.isFirst && !result.isLogin) {
        this.props.navigation.navigate('LoginStack');
      } else if (!result.isFirst && result.isLogin) {
        this.props.navigation.navigate('AppStack')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

let screenW = Dimensions.get('window').width
let screenH = Dimensions.get('window').height
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff'
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  },
  button: {
    width: screenW,
    height: screenH,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }
});