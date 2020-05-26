import React, { Component } from 'react'
import { connect } from 'react-redux'
import { white, gray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import { addCardToDeck } from '../utils/helpers'
import { addCard } from '../actions'
import Button from './Button'
import { CommonActions } from '@react-navigation/native';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  onChange = (text, type) => {
    this.setState({
      [type]: text
    })
  }

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'DeckList',
      })
    )
  }

  onSubmit = () => {
    const { title } = this.props.route.params
    const deck = this.props.decks[title]
    const card = this.state
    this.props.dispatch(addCard({card, ...deck}))
    addCardToDeck(deck.title, card)
    this.toHome()
  }


  render() {
    const { question, answer } = this.state
    const display = (question && answer) ? true : false

    return (
      <View style={styles.form}>
        <Text style={styles.heading}>Create A New Question</Text>
        <TextInput
          style={styles.newDeckForm}
          placeholder="Question"
          onChangeText={(text) => this.onChange(text, 'question')}
          defaultValue={this.state.question}
        />
        <TextInput
          style={styles.newDeckForm}
          placeholder="Answer"
          onChangeText={(text) => this.onChange(text, 'answer')}
          defaultValue={this.state.answer}
        />
        {display && <Button onPress={this.onSubmit} text={'Submit'}/>}
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

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(NewCard)