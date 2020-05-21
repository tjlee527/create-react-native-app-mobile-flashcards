import React, { Component } from 'react'
import { white, purple, green, gray, darkGray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import Button from './Button'


class FlippedCard extends Component {
  render() {
    const { info, handleAnswer } = this.props

    return (
      <View style={styles.deck}>
        <Text style={styles.title}>{info.answer}</Text>
        <Button onPress={() => handleAnswer('correct')} text={'Correct'}/>
        <Button onPress={() => handleAnswer('incorrect')} text={'Incorrect'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    width: 250,
    height: 150,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: darkGray,
    borderRadius: 3,
    margin: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    margin: 5,
    padding: 5,
  },
})


export default FlippedCard