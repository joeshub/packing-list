import React, { Component } from "react"
import { PackingListScreen } from "../screens/packing-list-screen"
import { InputScreen } from "../screens/input-screen"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { Provider, Container } from "unstated"
import { Text, View, AsyncStorage } from "react-native"
import { colors } from "../theme/colors"
import Icon from "react-native-vector-icons/Ionicons"

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
      tabBarIcon: ({ focused, tintColor }) => {
        const { key } = navigation.state
        return key === "List" ? (
          <Icon name="ios-apps-outline" color={tintColor} size={24} />
        ) : (
          <View>
            <Icon
              name="ios-browsers-outline"
              size={28}
              color={tintColor}
              style={{
                position: "absolute",
                left: -12,
                bottom: -16,
                transform: [{ rotateY: "180deg" }]
              }}
            />
            <Icon
              color={tintColor}
              name="md-add"
              size={16}
              style={{ position: "absolute", top: -6, left: -4 }}
            />
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
      alert("Please enter an item!")
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
