import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions/index'

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
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
          return (
            <Deck
              key={deck.title}
              style={styles.row}
              deck={deck}
              navigation={this.props.navigation}
            />
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
  }
})

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)