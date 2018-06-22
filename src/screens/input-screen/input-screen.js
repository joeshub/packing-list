import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import { ListInput } from "../../components/list-input"
/*
  STEP SEVEN
  • Create an input-screen
  • Integrate react-navigation
  • Pass the current items thru to packing-list-screen and display
  • Make packing-list-screen accept navigation params as state
*/

export class InputScreen extends React.Component {
  state = { inputValue: null }

  clearInput() {
    this.setState({ inputValue: null })
  }

  handleInput(value) {
    this.setState({ inputValue: value })
  }

  handleAddPress() {
    const { inputValue, items } = this.state
    if (inputValue) {
      const newItems = items.concat(inputValue)
      this.setState({ items: newItems })
      this.clearInput()
    }
  }

  handleClearPress() {
    this.setState({ items: [] })
    this.clearInput()
  }

  renderInputRow() {
    const { inputValue } = this.state
    return (
      <ListInput
        value={inputValue}
        onChangeText={value => this.handleInput(value)}
        onAddItem={() => this.handleAddPress()}
        onClearItems={() => this.handleClearPress()}
      />
    )
  }

  listItems(item, index) {
    // LayoutAnimation.spring()
    const borderRightWidth = index % 1 > 0 ? 0 : 1
    const borderBottomWidth = this.state.items.length - 3 > index ? 1 : 0
    return (
      <TouchableOpacity
        onPress={() => this.checkItem(item)}
        style={[styles.itemWrapper, { borderRightWidth, borderBottomWidth }]}
        key={index}
      >
        <Text style={styles.item}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        {this.renderInputRow()}
        <View style={{ flexDirection: "row" }}>
          {items.map((item, i) => (
            <Text onPress={() => this.checkItem(item)} key={i} style={styles.theValue}>
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
