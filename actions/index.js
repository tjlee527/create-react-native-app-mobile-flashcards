import { _addStarterDecks } from '../utils/_DATA.js'
import { getDecks } from '../utils/helpers'


export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

// export function handleInitialDecks () {
//   console.log('done')
//   return (dispatch) => {
//     console.log('dispatch')
//     return (_addStarterDecks()
//       .then(() => getDecks())
//       .then((decks) => {
//         console.log(decks, 'handle')
//         dispatch(receiveDecks(decks))
//       }))
//   }
// }

let deck = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
}

export function handleInitialDecks () {
  console.log('handle')
  return {
    type: RECEIVE_DECKS,
    decks: deck
  }
}

export function receiveDecks (decks) {
  console.log('dispatch', decks)
  return {
    type: RECEIVE_DECKS,
    decks: decks
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addCard ({ title, card }) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}