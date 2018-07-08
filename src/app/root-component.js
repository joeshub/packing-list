import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { Provider, Container } from "unstated"
import { Text, View, AsyncStorage } from "react-native"
import { colors } from "../theme/colors"

const RootStack = createBottomTabNavigator(
  {
    List: createStackNavigator({ PackingListScreen }),
    Input: createStackNavigator({ InputScreen })
  },
  {
    navigationOptions: ({ navigation, focused }) => ({
      tabBarOptions: {
        labelStyle: {
          fontSize: 10,
          bottom: 5
        },
        activeTintColor: colors.infiniteRed
      },
      tabBarIcon: ({ focused, tintColor }) =>
        focused ? (
          <View
            style={{
              width: 10,
              marginRight: 3,
              height: 10,
              marginRight: 3,
              backgroundColor: tintColor
            }}
          />
        ) : (
          <View
            style={{
              width: 10,
              marginRight: 3,
              height: 10,
              marginRight: 3,
              backgroundColor: tintColor
            }}
          />
        )
    })
  }
)

export class RootStore extends Container {
  state = {
    items: [],
    inputValue: null
  }

  setItems = items => this.setState({ items })

  handleInput = value => {
    this.setState({
      ...this.state,
      inputValue: value
    })
  }

  addItem = () => {
    const { items, inputValue } = this.state
    const newItems = [...items, { name: inputValue, checked: false }]
    this.setState({
      items: newItems,
      inputValue: null
    })
    AsyncStorage.setItem("items", JSON.stringify(newItems))
  }

  clearItems = () => {
    this.setState({
      items: [],
      inputValue: null
    })
  }

  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })
    this.setState({ items: newItems })
    AsyncStorage.setItem("items", JSON.stringify(newItems))
  }
}

export default class RootComponent extends Component {
  constructor() {
    super()
    this.rootStore = new RootStore()
    this.refreshList(this.rootStore)
  }
  refreshList = async rootStore => {
    await AsyncStorage.getItem("items", (error, items) => {
      items && rootStore.setItems(JSON.parse(items))
    })
  }

  render() {
    return (
      <Provider inject={[this.rootStore]}>
        <RootStack />
      </Provider>
    )
  }
}
