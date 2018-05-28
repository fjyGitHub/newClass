import React, {Component} from 'react';
import {
  TouchableOpacity,
  View, Image,
  Text,
  StyleSheet
} from 'react-native';

export default class RefreshCell extends Component {

  render() {
    let {item} = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.5}>
        <View style={styles.cell}>
          <Image
               // resizeMode={Image.resizeMode.contain}
               style={styles.cell_img}
               source={{uri:item.picture}}>
          </Image>
          <Text style={styles.cell_title}>{item.name}</Text>
          <View style={styles.cell_user}>
            <View style={styles.cell_user_info}>
              <Image
                resizeMode={Image.resizeMode.contain}
                style={styles.cell_user_info_img}
                source={{uri:item.head_image}}>
              </Image>
              <Text style={styles.cell_user_info_name}>{item.nick_name}</Text>
            </View>
            <View style={styles.cell_user_people}>
              <Image
                resizeMode={Image.resizeMode.contain}
                style={styles.cell_user_people_img}
                source={require('../../assets/img/people.png')}>
              </Image>
              <Text style={styles.cell_user_people_number}>{item.integral}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  cell_img: {
    width: 172,
    height: 172
  },
  cell_title: {
    width: '100%',
    height: 46,
    lineHeight: 46,
    marginLeft: 12,
    fontSize: 14,
    color: '#666666',
  },
  cell_user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12
  },
  cell_user_info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  cell_user_info_img: {
    width: 22,
    height: 22,
    borderRadius: 10,
    overflow: 'hidden'
  },
  cell_user_info_name: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 6
  },
  cell_user_people: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  cell_user_people_img: {
    width: 10,
    height: 10
  },
  cell_user_people_number: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 5
  }
});