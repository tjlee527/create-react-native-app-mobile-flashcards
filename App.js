import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar
} from 'react-native'
import Constants from 'expo-constants'

import { _addStarterDecks } from './utils/_DATA'
import { getDecks } from './utils/helpers'
import { green } from './utils/colors'
import NewDeck from './components/NewDeck'

import DeckList from './components/DeckList'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'


//status bar doesn't work yet
function FlashcardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  )
}


class App extends Component {
  state = {
    desks: []
  }

  componentDidMount() {
    getDecks()
      .then((data) => {
        if (data) {
          this.setState({
            decks: Object.keys(data).map((deck) => data[deck])
          })
        }
      })
      //   let deckTitles = Object.keys(data);
      //   if (deckTitles.length === 0) {
      //     _addStarterDecks()
      //       .then((data) => {
      //         this.setState({
      //           decks: data
      //         })
      //       })
      //   } else {
      //     this.setState({
      //       decks: deckTitles.map((deck) => data[deck])
      //     })
      //   }
      // })
    }

  render() {
    const { decks } = this.state

    if (decks) {
      return (
        <View style={styles.container}>
          <FlashcardStatusBar
            backgroundColor={green}
            barStyle='light-content'
          />
          <DeckList decks={decks}/>
          {/* <NewDeck /> */}
          {/* <NewCard title='Practice'/> */}
          {/* <Quiz deck='Practice'/> */}
        </View>
      )
    }
    return (
        <View style={styles.container}>
          <Text>No decks yet, add a new one!</Text>
        </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
