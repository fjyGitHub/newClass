/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import toast from '../../utils/toast'
import urls from '../../api/api'
import {fetchRequest} from '../../fetch/request1'
// import { scaleSize, setSpText, pixel }from '../../utils/screenUtil'
import DatePicker from 'react-native-datepicker'
// 日期样式
let dataStyle = {
  dateInput: {
    height: 46,
    marginRight: 12,
    alignItems: 'flex-end',
    borderWidth: 0,
  },
  dateText: {
    width: '100%',
    fontSize: 14,
    textAlign: 'right'
  },
  placeholderText: {
    textAlign: 'right',
    color: '#999999'
  }
}
export default class HomeDetail extends Component {
  static navigationOptions = {
    headerTitle: '课程详情',
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
    this.state = {
      class_info: {
        class_start: '',
        created_at: '',
        description: '',
        end_time: '',
        integral: '',
        name: '',
        nick_name: '',
        password: '',
        start_time: '',
        status: '',
        id: '',
        uid: '',
        updated_at: '',
        user_count: 0
      },
      userRole: 'app',
      applyState: 'save',
      class_end_time: ''
    }
  }
  _getCurriculumInfo = () => {
    const { params } = this.props.navigation.state;
    const _id = params ? params.id : '';
    fetchRequest(
      {
        url: urls.getCurriculumInfo,
        method: 'get',
        params: {
          id: _id
        }
      }
    ).then(res=> {
      let _data = res.data
      this.setState({
        class_info: _data
      })
      console.log(res)
    }).catch(err => {

    })
  }
  // 报名
  _onApplyClick = () => {
    fetchRequest({
      url: urls.postSignUpCurriculum,
      params: {
        uid: this.state.class_info.uid,
        curriculum_id: this.state.class_info.id
      }
    }).then(res => {
      toast.show('报名成功！')
    }).catch(err => {
      toast.show('报名失败!')
    })
  }
  // 修改课程
  _onChangeClick = () => {
    fetchRequest({
      url: urls.editCurriculumInfo,
      params: {
        cid: this.state.class_info.uid,
        class_start_time: this.state.class_info.class_start_time,
        class_end_time: this.state.class_info.class_end_time
      }
    }).then(res => {
      toast.show('修改成功！')
      console.log(res)
    }).catch(err => {
      toast.show('修改失败！')
    })
  }
  _renderStartDate = () => {
    if (this.state.userRole==='user') {
      return (<View style={styles.class_detail_middle_item}>
        <Text style={styles.class_detail_title}>上课时间</Text>
        <Text style={styles.class_detail_text}>{this.state.class_info.class_start}</Text>
      </View>)
    } else {
      return (<View style={styles.class_detail_middle_item}>
        <Text style={styles.date_left}>课程开始时间</Text>
        <View style={styles.date_right}>
          <DatePicker
            style={{flex:1}}
            date={this.state.class_info.start_time}
            mode="datetime"
            placeholder="请选择课程结束时间"
            showIcon={false}
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={dataStyle}
            onDateChange={(date) => {this.setState({
              class_info: {...this.state.class_info, start_time: date}
            })}}/>
          <Image
            resizeMode={Image.resizeMode.contain}
            style={styles.date_arrow}
            source={require('../../assets/img/right_arrow.png')}></Image>
        </View>
      </View>)
    }
  }
  _renderIntervalDate = () => {
    if (this.state.userRole==='user') {
      return <View style={[styles.class_detail_middle_item, {borderBottomWidth:0}]}>
        <Text style={styles.class_detail_title}>课程时间</Text>
        <Text style={styles.class_detail_text}>{`${this.state.class_info.start_time}~${this.state.class_info.end_time}`}</Text>
      </View>
    } else {
      return <View style={[styles.class_detail_middle_item, {borderBottomWidth:0}]}>
        <Text style={styles.date_left}>课程结束时间</Text>
        <View style={styles.date_right}>
          <DatePicker
            style={{flex:1}}
            date={this.state.class_info.end_time}
            mode="datetime"
            placeholder="请选择课程结束时间"
            showIcon={false}
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={dataStyle}
            onDateChange={(date) => {this.setState({
              class_info: {...this.state.class_info, end_time:date}
            })}}/>
          <Image
            resizeMode={Image.resizeMode.contain}
            style={styles.date_arrow}
            source={require('../../assets/img/right_arrow.png')}></Image>
        </View>
      </View>
    }
  }
  _renderApplyButton = () => {
    if (this.state.userRole==='user') {
      return (
        <TouchableOpacity activeOpacity={0.6}
                          onPress={this._onChangeClick}
                          style={styles.class_detail_apply}>
          <Text style={styles.class_detail_apply_text}>保存修改</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity activeOpacity={0.6}
                          onPress={this._onApplyClick}
                          style={styles.class_detail_apply}>
          <Text style={styles.class_detail_apply_text}>立即报名</Text>
        </TouchableOpacity>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.class_detail_top}>
            <Text style={styles.class_detail_top_title}>{this.state.class_info.name}</Text>
            <Text style={styles.class_detail_top_name}>{this.state.class_info.nick_name}</Text>
            <View style={styles.class_detail_top_integral}>
              <Text style={styles.class_detail_top_number}>{this.state.class_info.integral}</Text>
              <Text style={styles.class_detail_top_text}>积分</Text>
            </View>
          </View>
          <View style={styles.class_detail_middle}>
            <View style={styles.class_detail_middle_item}>
              <Text style={styles.class_detail_title}>预报名人数</Text>
              <Text style={styles.class_detail_text}>{this.state.class_info.user_count}人</Text>
            </View>
            {/*上课时间*/}
            {this._renderStartDate()}
            {/*课程时间*/}
            {this._renderIntervalDate()}
          </View>
          <View style={styles.class_detail_bottom}>
            <View style={styles.class_detail_bottom_title}>
              <Text style={styles.class_detail_bottom_text}>课程简介</Text>
            </View>
            <Text style={styles.class_detail_bottom_intro}>{this.state.class_info.description}</Text>
          </View>
        </ScrollView>
        {/*申请按钮*/}
        {this._renderApplyButton()}
      </View>
    );
  }
  componentDidMount() {
    this._getCurriculumInfo()
  }
}

let pixel = 1 / PixelRatio.get() // 1像素
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f5f5f5'
  },
  class_detail_top: {
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
  },
  class_detail_top_title: {
    fontSize: 16,
    color: '#333333',
  },
  class_detail_top_name: {
    fontSize: 14,
    color: '#999999',
    marginTop: 12
  },
  class_detail_top_integral: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 24,
  },
  class_detail_top_number: {
    fontSize: 20,
    color: '#CF353B',
  },
  class_detail_top_text: {
    height: '100%',
    lineHeight: 24,
    fontSize: 12,
    marginLeft: 3,
    color: '#999999'
  },
  class_detail_middle: {
    marginTop: 10,
    backgroundColor: '#ffffff'
  },
  class_detail_middle_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 16,
    height: 48,
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8',
  },
  class_detail_title: {
    fontSize: 14,
    textAlign: 'left',
    color: '#333333',
  },
  class_detail_text: {
    color: '#9B9B9B',
    textAlign: 'right'
  },
  date_left: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    color: '#333333'
  },
  date_right: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  date_arrow: {
    width: 7,
    height: 12
  },
  class_detail_bottom: {
    marginTop: 10,
    backgroundColor: '#ffffff'
  },
  class_detail_bottom_title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    paddingLeft: 18,
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8',
  },
  class_detail_bottom_text: {
    fontSize: 15,
    color: '#333333',
    letterSpacing: 2
  },
  class_detail_bottom_intro: {
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 16,
    paddingBottom: 46,
    fontSize: 12,
    color: '#666666',
    lineHeight: 23
  },
  class_detail_apply: {
    position: 'absolute',
    width: '100%',
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    bottom: 0,
    left: 0
  },
  class_detail_apply_text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  }
});
