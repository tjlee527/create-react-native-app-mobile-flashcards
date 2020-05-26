import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, darkGray } from '../utils/colors'
import Deck from './Deck'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions/index'
import Button from './Button'


class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
  }

  handleClick = (destination, title) => {
    this.props.navigation.navigate(
      destination,
      { title: title}
    )
  }

  render() {
    const { decks } = this.props
    if (decks === undefined) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    const deckArr = Object.keys(decks).map((deck) => decks[deck])

    return (
      <View style={styles.container}>
      {deckArr.length !== 0
        ? deckArr.map((deck) => {
          const emptyDeck = deck.questions ? false : true

          return (
            <View key={deck.title} style={styles.deck}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.description}>{emptyDeck ? 0 : deck.questions.length} cards</Text>
              <Button onPress={() => this.handleClick('ViewDeck', deck.title)} text='View Deck'/>
            </View>
          )
        })
        :  <Text style={styles.title}>No decks yet, add a new one!</Text>
      }
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
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

  description: {
    color: darkGray,
    fontSize: 14
  }
})

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)