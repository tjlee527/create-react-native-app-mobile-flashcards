export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
import { getDecks } from '../utils/helpers'


function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleReceiveDecks(decks) {
  return (dispatch) => {
    return(getDecks())
      .then((data) => {
        dispatch(receiveDecks(data))
      })
      .catch((e) => console.warn('error in getting data: ', e))
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard ({ title, card }) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}