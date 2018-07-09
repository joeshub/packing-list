import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { Provider, Container } from "unstated"
import { Text, View, AsyncStorage } from "react-native"

const RootStack = createBottomTabNavigator(
  {
    Home: createStackNavigator(
      { PackingListScreen },
      {
        navigationOptions: () => ({
          title: "Packing List"
        })
      }
    ),
    Input: createStackNavigator(
      { InputScreen },
      {
        navigationOptions: () => ({
          title: "ADD ITEM"
        })
      }
    )
  },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation, focused }) => ({
      tabBarOptions: {
        labelStyle: {
          fontSize: 16,
          bottom: 12
        }
      },
      title: "Header title",
      tabBarLabel: ({ focused, tintColor }) => {
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: focused ? "royalblue" : "transparent"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: focused ? "800" : "100",
                color: focused ? "white" : "black"
              }}
            >
              {navigation.state.routeName}
            </Text>
          </View>
        )
      }
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
    if (inputValue) {
      const newItems = [...items, { name: inputValue, checked: false }]
      this.setState({
        items: newItems,
        inputValue: null
      })
      AsyncStorage.setItem("items", JSON.stringify(newItems))
    } else {
      alert("You must enter an item!")
    }
  }

  clearItems = () => {
    this.setState({
      items: [],
      inputValue: null
    })
    AsyncStorage.setItem("items", JSON.stringify([]))
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
