import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"
import { createStackNavigator } from "react-navigation"
import { Provider, Container } from "unstated"

const RootStack = createStackNavigator(
  {
    Home: PackingListScreen,
    Input: InputScreen
  },
  {
    initialRouteName: "Home"
  }
)

export class RootStore extends Container {
  state = {
    items: [],
    inputValue: null
  }

  handleInput = value => {
    this.setState({
      ...this.state,
      inputValue: value
    })
  }

  addItem = () => {
    const { items, inputValue } = this.state
    const newItems = items.concat(inputValue)
    this.setState({
      items: newItems,
      inputValue: null
    })
  }

  clearItems = () => {
    this.setState({
      items: [],
      inputValue: null
    })
  }

  checkItem = selected => {
    const newItems = this.state.items.filter(item => item !== selected)
    this.setState({ items: newItems })
  }
}

export default class RootComponent extends Component {
  render() {
    const rootStore = new RootStore()
    return (
      <Provider inject={[rootStore]}>
        <RootStack />
      </Provider>
    )
  }
}
