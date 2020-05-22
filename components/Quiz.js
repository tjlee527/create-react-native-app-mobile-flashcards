import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { darkGray } from '../utils/colors'
import { getDeck, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Card from './Card'
import FlippedCard from './FlippedCard'
import Button from './Button'


class Quiz extends Component {
  state = {
    questions: [],
    correct: 0,
    incorrect: 0,
    currentNum: 0,
    flipped: false,
    completed: false
  }

  componentDidMount() {
    const { deck } = this.props.route.params
    const { questions, title } = deck
    this.setState({
      questions,
      title
    })
  }

  handleQuizRestart = () => {
    this.setState({
      flipped: false,
      currentNum: 0,
      incorrect: 0,
      correct: 0,
      completed: false
    })
  }

  toggleFlip = () => {
    this.setState((prevState) => ({
      flipped: !prevState.flipped,
    }))
  }

  handleAnswer = (type) => {
    this.setState((prevState) => ({
      [type]: prevState[type]+1,
      currentNum: prevState.currentNum + 1,
      completed: prevState.currentNum + 1 === prevState.questions.length
    }))
    this.toggleFlip()
  }

  render() {
    const { questions, correct, incorrect, currentNum, flipped, completed } = this.state
    const deckLength = questions.length

    if (deckLength) {
      const currentQuestion = questions[currentNum]
      if (completed) {
        clearLocalNotification()
          .then(setLocalNotification)
        return (
          <View style={styles.deck}>
            <Text style={styles.title}>Quiz Completed</Text>
            <View style={styles.description}>
              <Text>{Math.floor(100 * (correct/deckLength))}%</Text>
              <Text>Correct: {correct}</Text>
              <Text>Incorrect: {incorrect}</Text>
            </View>
            <Button
              text={'Restart Quiz'}
              onPress={this.handleQuizRestart}/>
            <Button
              text={'Back to Deck'}
              onPress={() => this.props.navigation.goBack()}/>
          </View>
        )
      } else {
        return (
          <View>
            <Text>{`${currentNum + 1}/${deckLength}`}</Text>
            {flipped
            ? <FlippedCard
                info={currentQuestion}
                handleAnswer={this.handleAnswer}
              />
          : <Card
              info={currentQuestion}
              toggleFlip={this.toggleFlip}
            />
          }
          </View>
        )
      }
    }

    return (
      <View>
        {this.state && <Text>{this.state.title}</Text>}
        <Text>Quiz</Text>
      </View>
    )
  }
}

export default Quiz

const styles = StyleSheet.create({
  deck: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    color: darkGray,
    fontSize: 14,
    padding: 20
  },
})