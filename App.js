import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducers'
// import middleware from './middleware'
import { _addStarterDecks } from './utils/_DATA'
import NewDeck from './components/NewDeck'

import DeckList from './components/DeckList'
import NewCard from './components/NewCard'

class App extends Component {
  state = {
    desks: []
  }

  componentDidMount() {
    _addStarterDecks()
      .then((data) => {
        this.setState({
          decks: data
        })
      })
  }

  render() {
    const { decks } = this.state

    if (decks) {
      return (
        <View style={styles.container}>
          {/* <DeckList decks={decks}/> */}
          {/* <NewDeck /> */}
          <NewCard title='Practice'/>
        </View>
      )
    }
    return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
    )
  }
}

export default App


// export default function App() {
//   return (
//     <Provider store={createStore(reducer, middleware)}>
//       <View style={styles.container}>
//         <DeckList />
//       </View>
//     </Provider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
