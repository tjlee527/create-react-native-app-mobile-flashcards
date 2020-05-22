import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Navigator
} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware/index.js'

import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { _addStarterDecks } from './utils/_DATA'
import { getDecks } from './utils/helpers'
import { green, white } from './utils/colors'
import NewDeck from './components/NewDeck'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';



import DeckList from './components/DeckList'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'




//status bar doesn't work yet
function FlashcardStatusBar ({ backgroundColor, ...props }) {
  const height = getStatusBarHeight()
  return (
    <SafeAreaView style={{ backgroundColor, height:44 }}>
      <StatusBar translucent {...props} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Tab = createBottomTabNavigator()
const TabsNav = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route, navigation }) => ({
      tabBarIcon: () => {
        let icon;
        const { name } = route
        if (name === 'Home') {
          icon = (
            <Ionicons name="ios-home" size={24} color={green} />
          )
        } else if (name === 'New Deck') {
          icon = (
            <FontAwesome name='plus-square' size={25} color={green} />
          )
        }
        return icon
      }
    })}
    tabBarOptions={{
      activeTintColor: green,
      style: {
        height: 80,
        backgroundColor: white,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
      <Tab.Screen name="Home" component={DeckList} />
      <Tab.Screen name="New Deck" component={NewDeck} />
  </Tab.Navigator>
)

const Stack = createStackNavigator()
const MainNav = (props) => {
  return (
    <Stack.Navigator headerMode='screen'>
      <Stack.Screen
        name="Home"
        component={TabsNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='NewDeck'
        component={NewDeck}
        options={{
          headerTintColor: white,
          headerStyle: { backgroundColor: green }
        }}
      />
      <Stack.Screen
        name='Quiz'
        component={Quiz}
        options={{
          headerTintColor: white,
          headerStyle: { backgroundColor: green }
        }}
      />
      <Stack.Screen
        name='NewCard'
        component={NewCard}
        options={{
          headerTintColor: white,
          headerStyle: { backgroundColor: green }
        }}
      />
    </Stack.Navigator>
)
}

export default class App extends Component {
  render() {
      return (
        <Provider store={createStore(reducer, middleware)}>
          <View style={{flex: 1}}>
            {/* <DeckList /> */}
            {/* <NewCard deck='hello'/> */}
            {/* <NewDeck /> */}
            <NavigationContainer>
              <MainNav />
            </NavigationContainer>
          </View>
        </Provider>
      );
  }
}
