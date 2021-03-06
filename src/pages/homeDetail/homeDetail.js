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
  TouchableOpacity,
  ScrollView
} from "react-native";

import { scaleSize, setSpText, pixel }from '../../utils/screenUtil'

export default class HomeDetail extends Component {
  static navigationOptions = {
    headerTitle:'课程详情',
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.class_detail_top}>
            <Text style={styles.class_detail_top_title}>经济法练习题集大全</Text>
            <Text style={styles.class_detail_top_name}>李丹妮</Text>
            <View style={styles.class_detail_top_integral}>
              <Text style={styles.class_detail_top_number}>300</Text>
              <Text style={styles.class_detail_top_text}>积分</Text>
            </View>
          </View>
          <View style={styles.class_detail_middle}>
            <View style={styles.class_detail_middle_item}>
              <Text style={styles.class_detail_title}>预报名人数</Text>
              <Text style={styles.class_detail_text}>200人</Text>
            </View>
            <View style={styles.class_detail_middle_item}>
              <Text style={styles.class_detail_title}>上课时间</Text>
              <Text style={styles.class_detail_text}>2018-05-05-19:30</Text>
            </View>
            <View style={[styles.class_detail_middle_item, {borderBottomWidth:0}]}>
              <Text style={styles.class_detail_title}>课程时间</Text>
              <Text style={styles.class_detail_text}>2018-05-05-19:30</Text>
            </View>
          </View>
          <View style={styles.class_detail_bottom}>
            <View style={styles.class_detail_bottom_title}>
              <Text style={styles.class_detail_bottom_text}>课程简介</Text>
            </View>
            <Text style={styles.class_detail_bottom_intro}>本书内容包括：马克思主义中国化的历史进程和理论成果、马克思主义中国化理论成果的精髓、新民主主义革命理论、社会主义改造理论、社会主义的本质和根本任务、社会主义初级阶段理论等。</Text>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.6} style={styles.class_detail_apply}>
          <Text style={styles.class_detail_apply_text}>立即报名</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5f5'
  },
  class_detail_top: {
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(12),
    backgroundColor: '#ffffff',
    paddingLeft: scaleSize(10),
  },
  class_detail_top_title: {
    fontSize: setSpText(16),
    color: '#333333',
  },
  class_detail_top_name: {
    fontSize: setSpText(14),
    color: '#999999',
    marginTop: scaleSize(12)
  },
  class_detail_top_integral: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(10),
    height: scaleSize(24),
  },
  class_detail_top_number: {
    fontSize: setSpText(20),
    color: '#CF353B',
  },
  class_detail_top_text: {
    height: '100%',
    lineHeight: scaleSize(24),
    fontSize: setSpText(12),
    marginLeft: scaleSize(3),
    color: '#999999'
  },
  class_detail_middle: {
    marginTop: scaleSize(10),
    backgroundColor: '#ffffff'
  },
  class_detail_middle_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(16),
    height: scaleSize(48),
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8',
  },
  class_detail_title: {
    color: '#333333',
  },
  class_detail_text: {
    color: '#9B9B9B',
    textAlign: 'right'
  },
  class_detail_bottom: {
    marginTop: scaleSize(10),
    backgroundColor: '#ffffff'
  },
  class_detail_bottom_title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleSize(45),
    paddingLeft: scaleSize(18),
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8',
  },
  class_detail_bottom_text: {
    fontSize: setSpText(15),
    color: '#333333',
    letterSpacing: scaleSize(2)
  },
  class_detail_bottom_intro: {
    paddingRight: scaleSize(18),
    paddingLeft: scaleSize(18),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(46),
    fontSize: setSpText(12),
    color: '#666666',
    lineHeight: scaleSize(23)
  },
  class_detail_apply: {
    position: 'absolute',
    width: '100%',
    height: scaleSize(49),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    bottom: 0,
    left: 0
  },
  class_detail_apply_text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: setSpText(15)
  }
});
