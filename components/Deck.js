import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'



class Deck extends Component {


  render() {
    const { deck } = this.props


    return (
      <View>
        <Text>{deck.title}</Text>
      </View>
    )
  }
}


export default Deck