import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'

export const ALL_DECKS_KEY = 'Flashcards:allDecks'

export function clearStorage () {
  AsyncStorage.clear()
    .catch(e => console.log('problem clearing storage ', e))
}

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks () {
  // console.log(decks)
  return AsyncStorage.getItem(ALL_DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log(data, 'sdfsdfioejf')
      return data
    })
    .catch((err) => console.warn('error getting desks: ', err))
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
  return AsyncStorage.getItem(ALL_DECKS_KEY)
    .then(JSON.parse)
    .then((data) => data[id])
    .catch((err) => console.warn('error getting desks: ', err))
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
  const deck = {
    [title]: {
      title
    }
  }
  return AsyncStorage.mergeItem(ALL_DECKS_KEY, JSON.stringify(deck))
    .catch((err) => console.warn('error adding new deck: ', err))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
// card is an obj of answer & question
export function addCardToDeck(title, card) {
  AsyncStorage.getItem(ALL_DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      data[title].questions.push(card)
      AsyncStorage.mergeItem(ALL_DECKS_KEY, JSON.stringify(data))
    })
}