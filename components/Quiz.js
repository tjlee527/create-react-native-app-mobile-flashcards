import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Animated} from 'react-native'
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
    completed: false,
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    const { title } = this.props.route.params
    const deck = this.props.decks[title]
    const { questions } = deck
    const { bounceValue } = this.state

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.05}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()

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
      completed: false,
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
    const { questions, correct, incorrect, currentNum, flipped, completed, title, bounceValue } = this.state
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
            <Text style={styles.title}>Deck: {title}</Text>
            <Text style={styles.description}>{`${currentNum + 1}/${deckLength}`}</Text>
            {flipped
            ? <FlippedCard
                info={currentQuestion}
                handleAnswer={this.handleAnswer}
              />
          : <Animated.View
              style={[styles.title, {transform: [{scale: bounceValue}]}]}>
              <Card
                info={currentQuestion}
                toggleFlip={this.toggleFlip}
              />
            </Animated.View>

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

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)


const styles = StyleSheet.create({
  deck: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    color: darkGray,
    fontSize: 14,
    padding: 20,
    textAlign: 'center'
  },
})