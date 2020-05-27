import React, { Component } from 'react'
import { gray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import { saveDeckTitle } from '../utils/helpers'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import Button from './Button'
import { CommonActions } from '@react-navigation/native';




class NewDeck extends Component {
  state = {
    text: ''
  }

  onChange = (text) => {
    this.setState({
      text
    })
  }

  toDeck = (title) => {
    this.props.navigation.navigate(
      'ViewDeck',
      { title: title}
    )
  }

  onSubmit = () => {
    const title = this.state.text
    const { dispatch } = this.props
    saveDeckTitle(title)
    dispatch(addDeck({title}))
    this.setState({
      text: ''
    })
    this.toDeck(title)
  }

  render() {
    const { text } = this.state
    const displayButton = text.length === 0 ? false : true
    return (
      <View style={styles.form}>
        <Text style={styles.heading}>Create A New Deck</Text>
        <TextInput
          style={styles.newDeckForm}
          placeholder="New Deck Title"
          onChangeText={this.onChange}
          defaultValue={this.state.text}
        />
        {displayButton && <Button onPress={this.onSubmit} text={'Submit'}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 50
  },
  heading: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  newDeckForm: {
    height: 40,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: gray,
    marginBottom: 10
  },
})

export default  connect()(NewDeck)