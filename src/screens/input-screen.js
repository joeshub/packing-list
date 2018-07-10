import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { ListInput } from "../components/list-input"

export class InputScreen extends React.Component {
  constructor(props) {
    super(props)
    const { navigation } = props
    const items = navigation.getParam("items", [])
    this.state = { items }
    this.onClear = navigation.getParam("onClear", null)
    this.onAdd = navigation.getParam("onAdd", null)
    this.setInputValue = navigation.getParam("setInputValue", null)
  }

  clearInput() {
    this.setInputValue(null)
  }

  handleInput(value) {
    this.setInputValue(value)
  }

  handleAddPress() {
    const { navigation } = this.props
    this.onAdd()
    navigation.goBack()
  }

  handleClearPress() {
    this.onClear()
    this.setState({ items: [] })
    this.clearInput()
  }

  renderInputRow() {
    return (
      <ListInput
        value={this.inputValue}
        onChangeText={value => this.handleInput(value)}
        onAddItem={() => this.handleAddPress()}
        onClearItems={() => this.handleClearPress()}
      />
    )
  }

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        {this.renderInputRow()}
        <View style={{ flexDirection: "row" }}>
          {items.map((item, i) => (
            <Text key={i} style={styles.theValue}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  theValue: {
    margin: 10,
    fontSize: 18
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 12
  }
})
