import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'


export const ALL_DECKS_KEY = 'Flashcards:allDecks'
const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearStorage () {
  AsyncStorage.clear()
    .catch(e => console.log('problem clearing storage ', e))
}

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks () {
  return AsyncStorage.getItem(ALL_DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      return data
    })
    .catch((err) => console.warn('error getting desks: ', err))
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
  return AsyncStorage.getItem(ALL_DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      return data[id]
    })
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
      const newQs = data[title].questions || []
      newQs.push(card)
      data[title].questions = newQs
      AsyncStorage.mergeItem(ALL_DECKS_KEY, JSON.stringify(data))
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationAsync)
}

function createNotification () {
  return {
    title: 'Study Reminder!',
    body: "Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}