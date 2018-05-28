import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ViewPagerAndroid
} from "react-native";
export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }
  onPageScroll() {
    console.log('00000')
  }
  _pageSelected(event) {
    console.log(event)
    // this.setState({page: event.nativeEvent.position})
  }
  render() {
    return (
      <ViewPagerAndroid
        style={styles.container}
        initialPage={0}
        onPageScroll={this.onPageScroll}
        onPageSelected={this._pageSelected.bind(this)}>
        <View style={styles.pageStyle}>
          <Text>0</Text>
          {/*<Image*/}
            {/*style={styles.img}*/}
            {/*resizeMode={Image.resizeMode.contain}*/}
            {/*source={require('../../assets/img/login/login_bg.png')}>*/}
          {/*</Image>*/}
        </View>
        <View style={styles.pageStyle}>
          <Text>1</Text>
          {/*<Image*/}
          {/*style={styles.img}*/}
          {/*resizeMode={Image.resizeMode.contain}*/}
          {/*source={require('../../assets/img/login/login_bg.png')}>*/}
          {/*</Image>*/}
        </View>
        <View style={styles.pageStyle}>
          <Text>2</Text>
          {/*<Image*/}
          {/*style={styles.img}*/}
          {/*resizeMode={Image.resizeMode.contain}*/}
          {/*source={require('../../assets/img/login/login_bg.png')}>*/}
          {/*</Image>*/}
        </View>

      </ViewPagerAndroid>
    )
  }
}
let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pageStyle: {
    width: screenW,
    height: screenH
    // backgroundColor:'red'
  },
  img: {
    width: screenW,
    height: screenH
  }
})