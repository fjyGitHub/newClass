import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

export default class TabBarItem extends Component {
  static defaultProps = {
    showIcon: false
  }
  render() {
    return (
        this.props.showIcon ?
          <Image
            source={{uri: 'tab_add'}}
            style={styles.tab_item_img}
          /> :
          <View style={[styles.tab_item, this.props.focused ? styles.tab_item_focused : null]}>
            <Text style={styles.tab_item_title}>{this.props.title}</Text>
          </View>
    );
  }
}
const styles = StyleSheet.create({
  tab_item: {
    width: 60,
    height: '100%',
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  tab_item_focused: {
    borderBottomColor: '#29BF88',
  },
  tab_item_img: {
    width: 37,
    height: 37
  },
});