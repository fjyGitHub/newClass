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
  ScrollView,
  NativeModules,
  TouchableOpacity
} from "react-native";

var TakeViewManager = NativeModules.TakeViewManager;

import { scaleSize, setSpText, pixel,dateParse }from '../../utils/screenUtil'

import DatePicker from 'react-native-datepicker'

import ImagePicker from 'react-native-image-picker'

const photoOptions = {
  title: '选择图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2,
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: false,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

import {uploadImage} from '../../fetch/request'

import urls from '../../api/api'

import { toastShort } from '../../utils/toast';
export default class CreatTab extends Component {
  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle:'创建课程',
    tabBarOnPress: (tab) => {
      tab.jumpToIndex(tab.scene.index)
    }
  })
  constructor(props) {
    super(props);
    this.state = {
      uid: 1,
      file: '',
      class_name: '',
      class_description: '',
      class_up_time: "",
      class_start_time:'',
      class_end_time: '',
      class_integral: '',
      class_password: '',
      source: require('../../assets/img/create/create_add.png')
    }
  }
  _handleTest() {
    TakeViewManager.addEventCeshi(('测试'),(error,events) =>{

    });
  }
  //  创建课堂
  _handleCreateClass() {

    if (this.state.class_name==='') {
      toastShort('请输入课程名称')
    } else if (this.state.class_description==='') {
      toastShort('请输入课程描述')
    } else if (this.state.file==='') {
      toastShort('请选择课程图片')
    } else if (this.state.class_up_time==='') {
      toastShort('请选择上课时间')
    } else if (this.state.class_start_time==='') {
      toastShort('请选择课程开始时间')
    } else if (this.state.class_end_time==='') {
      toastShort('请选择课程结束时间')
    } else if (this.state.class_integral==='') {
      toastShort('请输入所需积分')
    } else if (this.state.class_password==='') {
      toastShort('请输入房间密码')
    } else {
      uploadImage(urls.postCurriculumInfo, {
        uid: this.state.uid,
        file: this.state.file,
        class_name: this.state.class_name,
        class_description: this.state.class_description,
        class_up_time: this.state.class_up_time,
        class_start_time: this.state.class_start_time,
        class_end_time: this.state.class_end_time,
        class_integral: this.state.class_integral,
        class_password: this.state.class_password,
      }).then(res=> {
        this.setState({
          uid: 1,
          file: '',
          class_name: '',
          class_description: '',
          class_up_time: "",
          class_start_time:'',
          class_end_time: '',
          class_integral: '',
          class_password: '',
          source: require('../../assets/img/create/create_add.png')
        }, ()=>{
          toastShort('创建课程成功')
        })
      }).catch(err => {
      })
    }
  }
  //  选择图片
  _showImagePicker() {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          file: response.uri,
          source:{uri: response.uri}
        })
      }
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.class_top}>
            <View style={styles.item}>
              <Text style={styles.item_left}>课程名称</Text>
              <TextInput style={styles.item_right}
                         underlineColorAndroid="transparent"
                         placeholder="请在这里输入课程名称"
                         onChangeText={(class_name) => this.setState({class_name})}
                         value={this.state.class_name}>
              </TextInput>
            </View>
            <View style={[styles.item, styles.item_intro]}>
              <Text style={[styles.item_left, {flex: 0}]}>课程简介</Text>
              <TextInput
                style={styles.item_right_muti}
                underlineColorAndroid="transparent"
                multiline={true}
                placeholder="请在这里输入课程简介"
                onChangeText={(class_description) => this.setState({class_description})}
                value={this.state.class_description}>
              </TextInput>
            </View>
          </View>
          <View style={styles.class_bottom}>
            <TouchableOpacity activeOpacity={0.6} onPress={this._showImagePicker.bind(this)}>
              <View style={styles.class_bottom_upload}>
                <Image style={styles.class_bottom_upload_img}
                       resizeMode={Image.resizeMode.cover}
                       source={this.state.source}>
                </Image>
              </View>
            </TouchableOpacity>
            <View style={styles.item}>
              <Text style={styles.item_left}>上课时间</Text>
              <DatePicker
                style={{flex: 2}}
                date={this.state.class_up_time}
                mode="datetime"
                placeholder="请选择开课时间"
                iconSource={require('../../assets/img/right_arrow.png')}
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    width: scaleSize(5),
                    height: scaleSize(10),
                    right: 0,
                    top: Platform.OS === 'ios' ? scaleSize(15) : scaleSize(18)
                  },
                  dateInput: {
                    height: scaleSize(46),
                    marginRight: scaleSize(15),
                    alignItems: 'flex-end',
                    borderWidth: 0,
                  },
                  dateText: {
                    width: '100%',
                    fontSize: scaleSize(14),
                    textAlign: 'right'
                  },
                  placeholderText: {
                    textAlign: 'right',
                    color: '#999999'
                  }
                }}
                onDateChange={(date) => {this.setState({class_up_time: date})}}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.item_left}>课程开始时间</Text>
              <DatePicker
                style={{flex: 2}}
                date={this.state.class_start_time}
                mode="datetime"
                placeholder="请选择课程开始时间"
                iconSource={require('../../assets/img/right_arrow.png')}
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    width: scaleSize(5),
                    height:scaleSize(10),
                    right: 0,
                    top: Platform.OS === 'ios' ? scaleSize(15) : scaleSize(18)
                  },
                  dateInput: {
                    height: scaleSize(46),
                    marginRight: scaleSize(15),
                    alignItems: 'flex-end',
                    borderWidth: 0
                  },
                  dateText: {
                    width: '100%',
                    fontSize: scaleSize(14),
                    textAlign: 'right'
                  },
                  placeholderText: {
                    color: '#999999'
                  }
                }}
                onDateChange={(date) => {this.setState({class_start_time: date})}}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.item_left}>课程结束时间</Text>
              <DatePicker
                style={{flex: 2}}
                date={this.state.class_end_time}
                mode="datetime"
                placeholder="请选择课程结束时间"
                iconSource={require('../../assets/img/right_arrow.png')}
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    width: scaleSize(5),
                    height:scaleSize(10),
                    right: 0,
                    top: Platform.OS === 'ios' ? scaleSize(15) : scaleSize(18)
                  },
                  dateInput: {
                    height: scaleSize(46),
                    marginRight: scaleSize(15),
                    alignItems: 'flex-end',
                    borderWidth: 0
                  },
                  dateText: {
                    width: '100%',
                    fontSize: scaleSize(14),
                    textAlign: 'right'
                  },
                  placeholderText: {
                    color: '#999999'
                  }
                }}
                onDateChange={(date) => {this.setState({class_end_time: date})}}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.item_left}>所需积分</Text>
              <TextInput style={styles.item_right}
                         underlineColorAndroid="transparent"
                         keyboardType='numeric'
                         placeholder="请输入所需积分"
                         onChangeText={(class_integral) => this.setState({class_integral})}
                         value={this.state.class_integral}>
              </TextInput>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_left}>房间密码</Text>
              <TextInput style={styles.item_right}
                         keyboardType='numeric'
                         underlineColorAndroid="transparent"
                         placeholder="请输入6位数字密码(非必填)"
                         onChangeText={(class_password) => this.setState({class_password})}
                         value={this.state.class_password}>
              </TextInput>
            </View>
            <TouchableOpacity activeOpacity={0.6}
                              onPress={this._handleTest.bind(this)}
                              style={{justifyContent: 'center',
              alignItems: 'center'}}>
              <View style={styles.sure_button}>
                <Text style={styles.sure_button_text}>确认创建</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  class_top: {
    backgroundColor: '#ffffff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scaleSize(47),
    paddingHorizontal: scaleSize(16),
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8'
  },
  item_left: {
    flex: 1,
    fontSize: setSpText(14),
    textAlign: 'left',
    color: '#333333'
  },
  item_right: {
    flex: 2,
    fontSize: setSpText(14),
    padding: 0,
    textAlign: 'right'
  },
  item_intro: {
    alignItems: 'flex-start',
    height: scaleSize(115),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(13)
  },
  item_right_muti: {
    flex: 1,
    height:scaleSize(86),
    marginLeft: scaleSize(15),
    fontSize: setSpText(14),
    padding: 0,
    paddingLeft: scaleSize(17),
    paddingTop: scaleSize(10),
    textAlignVertical: 'top',
    backgroundColor: '#EEEEEE',
    borderRadius: scaleSize(5),
  },
  class_bottom: {
    marginTop: scaleSize(12),
    backgroundColor: '#ffffff'
  },
  class_bottom_upload: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop:scaleSize(25),
    paddingBottom: scaleSize(34),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#D8D8D8'
  },
  class_bottom_upload_img: {
    width: scaleSize(172),
    height: scaleSize(172)
  },
  sure_button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(48),
    marginBottom: scaleSize(56),
    width: scaleSize(271),
    height: scaleSize(44),
    backgroundColor: '#CCCCCC',
    borderRadius: scaleSize(6),
  },
  sure_button_text: {
    fontSize: setSpText(14),
    textAlign: 'center',
    color: '#ffffff',
  }
});
