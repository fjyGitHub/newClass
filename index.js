import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  SafeAreaView
} from "react-native";

//  导入本地保存
import './src/utils/storage'

import App from './src/pages/rootStack/rootStack';
// import Guide from './src/pages/guide/guide'

// 忽略警告
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated']

AppRegistry.registerComponent('NewClassroom', () => App);
