import React, { Component } from 'react'
import { connect } from 'react-redux'
import { white, darkGray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native'
import Button from './Button'


class Deck extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    const { bounceValue } = this.state

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.05}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
  }

  handleClick = (destination, emptyDeck) => {
    const { route, navigation } = this.props
    if (!emptyDeck) {
      navigation.navigate(
        destination,
        { title: route.params.title }
      )
    } else {
      alert('No cards yet')
    }

  }

  render() {
    const { title } = this.props.route.params
    const deck = this.props.decks[title]
    const { bounceValue } = this.state
    const emptyDeck = deck.questions ? false : true

    return (
      <Animated.View style={[styles.deck, {transform: [{scale: bounceValue}]}]}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.description}>{emptyDeck ? 0 : deck.questions.length} cards</Text>
        <Button onPress={() => this.handleClick('Quiz', emptyDeck)} text='Start Quiz'/>
        <Button onPress={() => this.handleClick('NewCard')} text='Add Card'/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    color: darkGray,
    fontSize: 14,
    padding: 20,
    textAlign: 'center'
  },
})

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Deck)