import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks ( state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: {
          ...action.decks
        }
      }

    case ADD_DECK :
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck.title]: action.deck
        }
      }

    case ADD_CARD :
      const oldQuestions = (state.decks[action.title] && state.decks[action.title].questions !== undefined)
        ? state.decks[action.title].questions
        : []

      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            questions: oldQuestions.concat([action.card])
          }
        }
        }
    default :
    return state
  }
}

export default decks