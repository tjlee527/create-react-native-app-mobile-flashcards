import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import { white, purple, green, gray, darkGray } from '../utils/colors'
import { getDeck } from '../utils/helpers'
import Card from './Card'
import FlippedCard from './FlippedCard'


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
    const { deck } = this.props
    getDeck(deck)
      .then((info) => {
        const { questions, title } = info
        this.setState({
          questions,
          title
        })
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
  }

  render() {
    const { questions, correct, incorrect, currentNum, flipped, completed } = this.state
    const deckLength = questions.length

    if (deckLength) {
      const currentQuestion = questions[currentNum]
      if (completed) {
        return (
          <View>
            <Text>Quiz Completed</Text>
            <Text>{Math.floor(100 * (correct/deckLength))}%</Text>
            <Text>Correct: {correct}</Text>
            <Text>incorrect: {incorrect}</Text>
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