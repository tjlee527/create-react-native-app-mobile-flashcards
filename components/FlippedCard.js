import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'

function FlippedCard ({ info, handleAnswer }) {
  return (
    <View style={styles.deck}>
      <Text style={styles.title}>{info.answer}</Text>
      <Button onPress={() => handleAnswer('correct')} text={'Correct'}/>
      <Button onPress={() => handleAnswer('incorrect')} text={'Incorrect'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    margin: 5,
    padding: 5,
  },
})


export default FlippedCard