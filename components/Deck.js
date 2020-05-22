import React, { Component } from 'react'
import { white, darkGray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import Button from './Button'


class Deck extends Component {
  handleClick = (destination) => {
    this.props.navigation.navigate(
      destination,
      { deck: this.props.deck}
    )
  }



  render() {
    const { deck } = this.props
    const emptyDeck = deck.questions ? false : true
    return (
      <View style={styles.deck}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.description}>{emptyDeck ? 0 : deck.questions.length} cards</Text>
        {!emptyDeck && <Button onPress={() => this.handleClick('Quiz')} text='Start Quiz'/>}
        <Button onPress={() => this.handleClick('NewCard')} text='Add Card'/>
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
})


export default Deck