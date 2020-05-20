import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Deck from './Deck'
// import { connect } from 'react-redux'
// import { getDecks } from '../utils/helpers'
// import { receiveDecks, handleInitialDecks } from '../actions/index'
// import { _addStarterDecks } from '../utils/_DATA'




class DeckList extends Component {
  componentDidMount() {
    // getDecks()
    //   .then((decks) => {
    //     console.log('decklist', decks)
    //     if (decks){
    //       getAllDecks(decks)
    //       console.log(this.props)
    //     }
    //   })

    // handleInitialDecks()

    // _addStarterDecks()
    //   .then(() => {
    //     getDecks()
    //       .then((decks) => {
    //         console.log(decks, 'decklist')
    //         if (decks) {
    //           getAllDecks(decks)
    //         } else {
    //           console.log('deck list empty')
    //         }
    //       })
    //   })

  }

  render() {
    const { decks } = this.props
    return (
      <View>
        {decks.map((deck) => (
          <Deck key={deck.title} deck={deck}/>
        ))}
      </View>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     getAllDecks: receiveDecks
//   }
// }

// function mapStateToProps(decks) {
//   return {
//     decks
//   }
// }

export default DeckList