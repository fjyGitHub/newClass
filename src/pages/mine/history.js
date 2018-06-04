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

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],  // 电影列表的数据源
      startPage: 1,   // 从第几页开始加载
    };
  }
  componentDidMount() {
    this.historyListView.beginHeaderRefresh();
  }

  render() {
    return (
      <RefreshListView
        ref={(ref) => {this.historyListView = ref}}
        data={this.state.historyList}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this._renderEmptyView}
        onHeaderRefresh={() => { this.headerLoadList() }}
        onFooterRefresh={() => { this.footerLoadList() }}
      />
    )
  }

  _renderItem = (item) => {
    return (
      <RefreshCell item={item.item} onPress={() => {
        this.props.navigation.navigate('ClassDetail')
      }}/>
    )
  };

  /// 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
  _renderEmptyView = (item) => {
    return <View/>
  };

  /**
   * 加载正在上映的电影列表
   */
  footerLoadList() {
    fetchRequest({
      url: urls.getUserBrowseRecords,
      method: 'get',
    }).then(res=> {
      let _data = res.data
      let _list = res.data || []
      // 获取总的条数
      let totalCount = _data.total;
      // 当前已经加载的条数
      let currentCount = this.state.historyList.length;
      // 根据已经加载的条数和总条数的比较，判断是否还有下一页
      let footerState = RefreshState.Idle;
      let startPage = this.state.startPage;
      if (currentCount < totalCount) {
        // 还有数据可以加载
        footerState = RefreshState.CanLoadMore;
        // 下次加载从第几条数据开始
        startPage = startPage + 1;
      } else {
        footerState = RefreshState.NoMoreData;
      }
      // 更新historyList的值
      let _historyList = this.state.historyList.concat(_list);
      this.setState({
        historyList: _historyList,
        startPage: startPage
      });
      this.historyListView.endRefreshing(footerState);
    }).catch(err => {
      console.log("加载失败");
      this.historyListView.endRefreshing(RefreshState.Failure);
    })
  }
  headerLoadList() {
    fetchRequest({
      url: urls.getUserBrowseRecords,
      method: 'get',
      params: {
        uid: 1
      }
    }).then(res=> {
      console.log(res)
      let _list = res.data || []
      let startPage = this.state.startPage;
      if (startPage > 1) {
        startPage = 1
      } else {
        // 下次加载从第几条数据开始
        startPage = startPage + 1;
      }
      this.setState({
        historyList: _list,
        startPage: startPage
      });
      this.historyListView.endRefreshing(RefreshState.NoMoreData);
    }).catch(err => {
      console.log("加载失败");
      this.historyListView.endRefreshing(RefreshState.Failure);
    })
  }
}