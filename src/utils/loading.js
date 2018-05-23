
import React, {Component} from 'react'

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import RootSiblings from 'react-native-root-siblings'

let sibling = null

const Loading = {
  show: () => {
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    )
  },

  hidden: (callback)=> {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
      callback && callback()
    }
  }
}



const styles = StyleSheet.create({
    maskStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backViewStyle: {
      backgroundColor: '#111',
      width: 120,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    }
  })

export default Loading
