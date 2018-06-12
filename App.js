import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"

/*
  STEP TWO
  • Move the input to its own function and a wrapper & some buttons
  • Introduce "items" array into local state
  • Able to push inputted items into the items array
  • Able to clear items from the items array
*/

export default class App extends Component {
  state = {
    inputValue: null,
    items: []
  }

  handleInput = value => {
    this.setState({ inputValue: value })
  }

  addNewItem() {
    const { inputValue, items } = this.state
    const newItems = items.concat(inputValue)
    this.setState({ items: newItems })
  }

  clearItems() {
    this.setState({ items: [] })
  }

  renderInputRow = () => {
    const { inputValue } = this.state
    return (
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={inputValue} onChangeText={this.handleInput} />{" "}
        {/* Introduce the new function syntax */}
        <TouchableOpacity style={styles.addButton} onPress={() => this.addNewItem()}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={() => this.clearItems()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { inputValue, items } = this.state
    return (
      <View style={styles.container}>
        {this.renderInputRow()}
        {items.map((item, i) => (
          <Text key={i} style={styles.theValue}>
            {item}
          </Text>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 5,
    fontSize: 16
  },
  theValue: {
    margin: 10,
    fontSize: 18
  },
  inputRow: {
    flexDirection: "row"
  },
  addButton: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "green"
  },
  clearButton: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "gray"
  },
  buttonText: {
    margin: 5,
    color: "white"
  }
})
