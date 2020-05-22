import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'

function Card ({ toggleFlip, info, style }) {
  return (
    <View style={[styles.deck, style]}>
      <Text style={styles.title}>{info.question}</Text>
      <Button onPress={toggleFlip} text={'See Answer'}/>
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
    padding: 25,
  }
})


export default Card