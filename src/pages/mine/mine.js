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
  TextInput,
  ScrollView
} from "react-native";

import { scaleSize, setSpText, pixel }from '../../utils/screenUtil'
export default class MineTab extends Component {

  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle:'个人中心',
    tabBarLabel:'个人中心'
  })
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{backgroundColor: '#ffffff'}}>
            <View style={styles.mine_info}>
              <View style={styles.mine_info_left}>
                <Image source={require('../../assets/img/mine/mine_touxiang.png')} style={styles.mine_info_left_img}></Image>
                <View style={{ marginLeft: scaleSize(20), marginTop:scaleSize(9)}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.mine_info_left_name}>Greyfey</Text>
                    <Image source={require('../../assets/img/mine/mine_huiyuan.png')} style={styles.mine_info_left_state}></Image>
                  </View>
                  <Text style={styles.mine_info_left_id}>ID：1231345</Text>
                </View>
              </View>
              <View style={styles.mine_info_right}>
                <Image source={require('../../assets/img/mine/mine_renzheng.png')} style={styles.mine_info_right_auth}></Image>
                <Text style={styles.mine_info_right_text}>已认证</Text>
              </View>
            </View>
          </View>
          <View style={styles.mine_class}>
            <View style={styles.mine_class_item}>
              <Text style={styles.mine_class_item_number}>2</Text>
              <Text style={styles.mine_class_item_title}>已购课程</Text>
            </View>
            <View style={[styles.mine_class_item, styles.mine_class_item_m]}>
              <Text style={styles.mine_class_item_number}>2</Text>
              <Text style={styles.mine_class_item_title}>已学习课程</Text>
            </View>
            <View style={styles.mine_class_item}>
              <Text style={styles.mine_class_item_number}>200</Text>
              <Text style={styles.mine_class_item_title}>剩余积分</Text>
            </View>
          </View>
          <View style={styles.mine_list}>
            <View style={styles.mine_list_item}>
              <Image source={require('../../assets/img/mine/mine_lishi.png')} style={styles.mine_list_item_icon}></Image>
              <View style={styles.mine_list_item_text}>
                <Text>浏览历史</Text>
                <Image source={{uri: 'right_arrow'}} style={styles.mine_list_item_arrow}></Image>
              </View>
            </View>
            <View style={styles.mine_list_item}>
              <Image source={require('../../assets/img/mine/mine_kefu.png')} style={styles.mine_list_item_icon}></Image>
              <View style={styles.mine_list_item_text}>
                <Text>客服中心</Text>
                <Image
                  resizeMode={Image.resizeMode.cover}
                  source={{uri: 'right_arrow'}}
                  style={styles.mine_list_item_arrow}>
                </Image>
              </View>
            </View>
            <View style={styles.mine_list_item}>
              <Image  resizeMode={Image.resizeMode.cover}
                     source={require('../../assets/img/mine/mine_genduo.png')}
                     style={[styles.mine_list_item_icon, {height: scaleSize(5)}]}>
              </Image>
              <View style={[styles.mine_list_item_text, {borderBottomWidth: 0}]}>
                <Text>更多</Text>
                <Image
                   resizeMode={Image.resizeMode.cover}
                  source={{uri: 'right_arrow'}}
                  style={styles.mine_list_item_arrow}>
                </Image>
              </View>
            </View>
            <View style={[styles.mine_list_item, {marginTop: scaleSize(10)}]}>
              <Image
                 resizeMode={Image.resizeMode.cover}
                source={require('../../assets/img/mine/mine_congzhi.png')}
                style={[styles.mine_list_item_icon, {width: scaleSize(16),height: scaleSize(19)}]}>
              </Image>
              <View style={[styles.mine_list_item_text, {borderBottomWidth: 0}]}>
                <Text>充值</Text>
                <Image
                   resizeMode={Image.resizeMode.cover}
                  source={{uri: 'right_arrow'}}
                  style={styles.mine_list_item_arrow}>
                </Image>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA'
  },
  mine_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: scaleSize(16),
    marginRight: scaleSize(16),
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(14),
    borderBottomWidth: pixel,
    borderBottomColor:'#e5e5e5'
  },
  mine_info_left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mine_info_left_img: {
    width:scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    overflow: 'hidden'
  },
  mine_info_left_name: {
    fontSize: setSpText(15),
    color: '#333333',
  },
  mine_info_left_state: {
    width: scaleSize(60),
    height: scaleSize(18),
    marginLeft: scaleSize(5)
  },
  mine_info_left_id: {
    fontSize: scaleSize(13),
    color: '#999999',
    marginTop: scaleSize(12)
  },
  mine_info_right: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(19),
    marginTop: scaleSize(9)
  },
  mine_info_right_auth: {
    width: scaleSize(16),
    height: scaleSize(19)
  },
  mine_info_right_text: {
    fontSize: scaleSize(10),
    color: '#1CCADA',
    marginLeft: scaleSize(4)
  },
  mine_class: {
    backgroundColor: '#ffffff',
    paddingTop: scaleSize(7),
    paddingBottom: scaleSize(7),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mine_class_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(5),
    marginBottom:scaleSize(5)
  },
  mine_class_item_m: {
    borderLeftWidth: pixel,
    borderRightWidth: pixel,
    borderColor: '#E5E5E5'
  },
  mine_class_item_number: {
    // height: scaleSize(20),
    fontSize: setSpText(20),
    color: '#1CCADA'
  },
  mine_class_item_title: {
    fontSize: setSpText(13),
    color:'#999999',
    marginTop: scaleSize(8)
  },
  mine_list: {
    marginTop: scaleSize(10),
  },
  mine_list_item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(47),
    backgroundColor: '#ffffff'
  },
  mine_list_item_icon: {
    width: scaleSize(18),
    height: scaleSize(18),
    marginLeft: scaleSize(17),
    marginRight: scaleSize(11)
  },
  mine_list_item_text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    height: '100%',
    borderBottomWidth: pixel
  },
  mine_list_item_arrow: {
    width: scaleSize(7),
    height: scaleSize(12),
    marginRight: scaleSize(11)
  }
});
