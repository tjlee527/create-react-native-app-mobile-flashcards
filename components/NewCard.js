import React, { Component } from 'react'
import { white, purple, green, gray, darkGray } from '../utils/colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native'
import { saveDeckTitle, getDecks, clearStorage, addCardToDeck } from '../utils/helpers'

function Button( { onPress, text }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}



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

  onSubmit = () => {
    console.log(this.state)
    // getDecks()
    const { title } = this.props
    addCardToDeck(title, this.state)
  }


  render() {
    const { question, answer } = this.state
    const display = (question && answer) ? true : false

    return (
      <View style={{padding: 10}}>
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
        {display && <Button onPress={this.onSubmit}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: gray,
    height: 40,
    width: 120,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: 30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 16,
    textAlign: 'center'
  },
})

export default NewCard