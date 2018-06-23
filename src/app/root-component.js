import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"
import { createStackNavigator } from "react-navigation"

const RootStack = createStackNavigator(
  {
    Home: PackingListScreen, // Going to create a "home" screen now
    Input: InputScreen
  },
  {
    initialRouteName: "Home"
  }
)

export default class RootComponent extends Component {
  render() {
    return <RootStack />
  }
}
