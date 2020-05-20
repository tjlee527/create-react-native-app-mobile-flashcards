import React, { Component } from 'react'
import { white, purple, green, gray, darkGray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
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



class Deck extends Component {
  clicked = () => {
    console.log('clicked')
  }

  render() {
    const { deck } = this.props

    return (
      <View style={styles.deck}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.description}>{deck.questions.length} cards</Text>
        <Button onPress={this.clicked} text='Start Quiz'/>
        <Button onPress={this.clicked} text='Add Card'/>
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
    fontSize: 20
  },
  description: {
    color: darkGray,
    fontSize: 14
  },
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


export default Deck