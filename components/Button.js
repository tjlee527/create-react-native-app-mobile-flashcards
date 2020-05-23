import React, { Component } from 'react'
import { white, purple, green, gray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'

function Button( { onPress, text }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button


const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: gray,
    height: 40,
    width: 120,
    marginLeft: 20,
    marginRight: 20,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 16,
    textAlign: 'center'
  },
})