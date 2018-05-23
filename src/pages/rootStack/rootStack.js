/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  AppRegistry,
  StyleSheet,
  View,
  Image,
  SafeAreaView
} from "react-native";

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';

// 首页
import Home from "../home/home";
//  课程详情
import HomeDetail from '../homeDetail/homeDetail'
// 创建
import Create from "../create/create";
// 我的
import Mine from "../mine/mine";
//  登录
// import Login from "../login/login"


const HomeStack = StackNavigator(
  {
    Home: Home,
    HomeDetail: HomeDetail
  },
  {
    initialRouteName: 'Home', // 默认显示界面
    navigationOptions: {
      headerTitleStyle: {
        fontSize: 17,
        color: '#000000'
      },
      headerStyle: {
        backgroundColor: '#ffffff'
      }
    }
  }
);
//
// HomeStack.navigationOptions = ({ navigation }) => {
//   return {
//     tabBarVisible: navigation.state.index === 0
//   }
// };
const CreateStack = StackNavigator(
  {
    Create: Create
  },
  {
    initialRouteName: 'Create',
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        fontSize: 17,
        textAlign: 'center',
      },
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
      }
    }
  }
);

const MineStack = StackNavigator(
  {
    Mine: Mine
  },
  {
    initialRouteName: 'Mine', // 默认显示界面
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        fontSize: 17,
        textAlign: 'center',
        color: '#000000'
      },
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
      }
    }
  }
);

const RootStack = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel:'课堂列表',
      // tabBarIcon: ({tintColor}) => (
      //   <Image source={require('../../assets/img/tab/tab_class.png')}
      //          style={{tintColor: tintColor}}/>)
    })
  },
  Create: {
    screen: CreateStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel:'创建课程',
      // tabBarIcon: ({tintColor}) => (
      //   <Image source={require('../../assets/img/tab/tab_pub.png')}
      //          style={{tintColor: tintColor}}/>)
    })
  },
  Mine: {
    screen: MineStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel:'个人中心',
      // tabBarIcon: ({tintColor}) => (<Image source={require('../../assets/img/tab/tab_mine.png')} style={[{tintColor: tintColor}, {width:24,height:24}]}/>)
    })
  },
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

import {isIphoneX} from '../../utils/screenUtil'

class App extends Component {
  render() {
    return (
      isIphoneX() ? <SafeAreaView style={styles.container}><RootStack/></SafeAreaView> : <RootStack/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5f5"
  }
});
export default App

