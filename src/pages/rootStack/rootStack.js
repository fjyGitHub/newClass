/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  PixelRatio,
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView
} from "react-native";

import {
  StackNavigator,
  SwitchNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';


//  首次安装引导页
import Guide from '../guide/guide1'
const GuideStack = StackNavigator({
  Guide: Guide
})
//  登录页
import Login from '../login/login'
const LoginStack = StackNavigator({
  Login: Login
})

// 首页
import Class from "../class/home1";
//  课程详情
import ClassDetail from '../class/classDetail'
// 创建
import Create from "../create/create";
// 我的
import Mine from "../mine/mine";
import History from "../mine/history";
const Home = TabNavigator({
  Class: Class,
  Create: Create,
  Mine: Mine
}, {
  tabBarVisible: false,
  animationEnabled: false, // 切换页面时不显示动画
  swipeEnabled: false, // 禁止左右滑动
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state
      if (routeName === 'Home') {
        return <Image source={require('../../assets/img/tab/tab_class.png')} style={{tintColor: tintColor}}/>
      } else if (routeName === 'Create') {
        return <Image source={require('../../assets/img/tab/tab_pub.png')} style={{tintColor: tintColor}}/>
      } else {
        return <Image source={require('../../assets/img/tab/tab_mine.png')} style={{tintColor: tintColor}}/>
      }
    }
  }),
  tabBarOptions: {
    activeTintColor: '#14C0D3', // 文字和图片选中颜色
    inactiveTintColor: '#7B7B7B', // 文字和图片默认颜色
    indicatorStyle: { height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    style: {
      backgroundColor: '#fff', // TabBar 背景色
    },
    labelStyle: {
      // color: '#999999',
      fontSize: 10, // 文字大小
    },
  },
})


const AppStack = StackNavigator({
  Home: Home,
  ClassDetail: ClassDetail,
  History: History
},
  {
    initialRouteName: 'Home', // 默认显示界面
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        fontSize: 17,
        textAlign: 'center',
        color: '#000000'
      },
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#D8D8D8'
      },
      headerBackTitle: null,
      headerTintColor: '#000000'
    }
  })

let RootStack = SwitchNavigator({
  GuideStack: GuideStack,
  LoginStack: LoginStack,
  AppStack: AppStack
}, {
  initialRouteName: 'GuideStack',
})

class App extends Component {
  render() {
    return <RootStack/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5f5"
  }
});
export default App

