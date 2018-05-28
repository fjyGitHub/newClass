import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import {fetchRequest} from '../../fetch/request1'
import urls from '../../api/api'

import RefreshListView from "../../components/refreshList/RefreshListView";

import RefreshCell from "../../components/refreshList/RefreshCell";

import RefreshState from "../../components/refreshList/RefreshState";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classList: [],  // 电影列表的数据源
      startPage: 1,   // 从第几页开始加载
    };
  }

  componentDidMount() {
    this.listView.beginHeaderRefresh();
  }

  render() {
    return (
      <RefreshListView
        ref={(ref) => {this.listView = ref}}
        data={this.state.classList}
        numColumns={2}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this._renderEmptyView}
        onHeaderRefresh={() => { this.loadClassList() }}
        onFooterRefresh={() => { this.loadClassList() }}
      />
    )
  }

  _renderItem = (item) => {
    console.log(item)
    return (
      <RefreshCell item={item.item} onPress={() => {
        this.props.navigation.navigate('HomeDetail')
      }}/>
    )
  };

  /// 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
  _renderEmptyView = (item) => {
    return <View/>
  };

  /**
   * 加载正在上映的电影列表，此处默认城市为北京，取20条数据显示
   */
  loadClassList() {
    fetchRequest({
      url: urls.getCurriculumList,
      method: 'get'
    }).then(res=> {
      let _data = res.data
      let _list = _data.data || []
      // 获取总的条数
      let totalCount = _data.total;
      // 当前已经加载的条数
      let currentCount = this.state.classList.length;
      // 根据已经加载的条数和总条数的比较，判断是否还有下一页
      let footerState = RefreshState.Idle;
      let startPage = this.state.startPage;
      if (currentCount + _list.length < totalCount) {
        // 还有数据可以加载
        footerState = RefreshState.CanLoadMore;
        // 下次加载从第几条数据开始
        startPage = startPage + 1;
      } else {
        footerState = RefreshState.NoMoreData;
      }
      // 更新movieList的值
      let _classList = this.state.classList.concat(_list);
      this.setState({
        classList: _classList,
        startPage: startPage
      });
      this.listView.endRefreshing(footerState);
    }).catch(err => {
      console.log("加载失败");
      this.listView.endRefreshing(RefreshState.Failure);
    })
  }
}