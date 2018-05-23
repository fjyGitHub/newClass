import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  SafeAreaView
} from "react-native";

import App from './src/pages/rootStack/rootStack';


// 忽略警告
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated']

AppRegistry.registerComponent('NewClassroom', () => App);
