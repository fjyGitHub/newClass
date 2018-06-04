import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

import Waterfall from "../../components/waterfall/waterfall";

import { scaleSize, setSpText, pixel }from '../../utils/screenUtil'

import fetchRequest from '../../fetch/request'


import urls from '../../api/api'

export default class Home extends React.Component {

  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarLabel: '课程列表',
    tabBarOnPress: (tab) => {
      let _scene = tab.scene
      if (!_scene.focused) {
        navigation.state.params.navigatePress()
      }
      tab.jumpToIndex(_scene.index)
    }
  })

  constructor(props) {
    super(props);
    this.state = {
      current_page: 1,
      searchName: '',
      hasMore: false,
      classList: []
    }
  }
  //  搜索请求
  _handleSearch(e) {
   console.log(e)
  }
  // tab点击
  _clickTabCallback() {
    this.load()
  }
  //  请求数据
  load() {
    fetchRequest(urls.getCurriculumList, {}, 'GET').then(res=> {
      console.log(res)
      let _data = res.data
      let _list = _data.data
      this.setState({
        classList: _list
      })
      this.refs.waterfall.addItems(_list);
    }).catch(err => {
    })
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('HomeDetail')}
        activeOpacity={0.5}>
        <View style={styles.cell}>
          <Image style={styles.cell_img}
                 source={{uri:item.picture}}></Image>
          <Text style={styles.cell_title}>{item.name}</Text>
          <View style={styles.cell_user}>
            <View style={styles.cell_user_info}>
              <Image style={styles.cell_user_info_img}
                     source={{uri:item.head_image}}>
              </Image>
              <Text style={styles.cell_user_info_name}>{item.nick_name}</Text>
            </View>
            <View style={styles.cell_user_people}>
              <Image style={styles.cell_user_people_img}
                     source={require('../../assets/img/people.png')}>
              </Image>
              <Text style={styles.cell_user_people_number}>{item.integral}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.class_header_wrap}>
          <View style={styles.class_header}>
            <Text style={styles.class_header_name}>新课吧</Text>
            <TextInput style={styles.class_header_input}
                       placeholder="搜索您需要的课程"
                       onEndEditing={this._handleSearch}
                       underlineColorAndroid="transparent"
                       clearTextOnFocus={true}
                       clearButtonMode='while-editing'
                       returnKeyType='search'
                       onChangeText={(searchName) => this.setState({searchName})}
                       value={this.state.searchName}>
            </TextInput>
          </View>
        </View>
        <Waterfall
          ref="waterfall"
          space={scaleSize(10)}
          containerStyle={styles.container}
          refreshing={this.refreshing.bind(this)}
          infiniting={this.infiniting.bind(this)}
          infinite={false}
          renderItem={item => this.renderItem(item)}
          renderInfinite={loading => this.renderLoadMore(loading)}
        />
      </View>
    )}

  infiniting(done) {
    setTimeout(() => {
      console.log('00000')
      this.refs.addItems(this.state.list);
      done();
    }, 1000);
  }

  refreshing(done) {
    this.load()
    done()
  }

  renderLoadMore(loading) {
    if (loading) {
      return (
        <Text>加载中...</Text>
      )
    } else {
      return (
        <Text>加载更多</Text>
      )
    }
  }
  componentWillMount() {
    console.log('000000')
    this.props.navigation.setParams({ navigatePress: this._clickTabCallback.bind(this) })
    // this.props.navigation.setParams({ onSearch: this._handleSearch })
  }
  componentDidMount() {
    this.load();
  }
}

// 设置cellmargin
let itemSpace = scaleSize(10)

const styles = StyleSheet.create({
  container: {
    paddingLeft:itemSpace,
    paddingRight: itemSpace,
    marginTop: scaleSize(14),
  },
  class_header_wrap: {
    height: 64,
    paddingLeft: scaleSize(16),
    paddingRight: scaleSize(12),
    backgroundColor: '#ffffff',
    borderBottomWidth: pixel,
    borderBottomColor: '#D8D8D8'
  },
  class_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 40
  },
  class_header_name: {
    fontSize: setSpText(14),
    color: '#29BF88',
  },
  class_header_input: {
    flex: 1,
    height: 24,
    fontSize: setSpText(11),
    padding: 0,
    paddingLeft: scaleSize(12),
    borderRadius: scaleSize(100),
    marginLeft: scaleSize(15),
    backgroundColor: '#EEEEEE'
  },
  cell_list: {
    paddingTop: scaleSize(14),
    paddingBottom: scaleSize(10)
  },
  cell: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  cell_img: {
    width: '100%',
    height: scaleSize(172)
  },
  cell_title: {
    width: '100%',
    height: scaleSize(46),
    lineHeight: scaleSize(46),
    marginLeft: scaleSize(12),
    fontSize: setSpText(14),
    color: '#666666',
  },
  cell_user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:scaleSize(12)
  },
  cell_user_info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(12),
  },
  cell_user_info_img: {
    width: scaleSize(22),
    height: scaleSize(22),
    borderRadius: scaleSize(10),
    overflow: 'hidden'
  },
  cell_user_info_name: {
    fontSize: setSpText(12),
    color: '#999999',
    marginLeft: scaleSize(6)
  },
  cell_user_people: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaleSize(12)
  },
  cell_user_people_img: {
    width: scaleSize(10),
    height: scaleSize(10)
  },
  cell_user_people_number: {
    fontSize: setSpText(12),
    color: '#999999',
    marginLeft: scaleSize(5)
  }
});