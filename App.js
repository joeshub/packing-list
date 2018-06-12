import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"

/*
  STEP THREE
  • Add ability to "check" an item
  • Bring in grid
  • Store checked-off values in local state
*/

export default class App extends Component {
  state = {
    inputValue: null,
    items: [],
    selectedItems: []
  }

  handleInput = value => {
    this.setState({ inputValue: value })
  }

  addNewItem() {
    const { inputValue, items } = this.state
    const newItems = items.concat(inputValue)
    this.setState({ items: newItems })
    this.input.clear()
  }

  clearItems() {
    this.setState({ items: [] })
    this.input.clear()
  }
  checkItem(selected) {
    const { items, selectedItems } = this.state
    const filteredItems = items.filter(item => item !== selected)
    this.setState({ items: filteredItems, selectedItems: selectedItems.concat(selected) })
  }

  renderInputRow = () => {
    const { inputValue } = this.state
    return (
      <View style={styles.inputRow}>
        <TextInput
          ref={ref => (this.input = ref)}
          style={styles.input}
          value={inputValue}
          onChangeText={this.handleInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => this.addNewItem()}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={() => this.clearItems()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }

  listItems(item, index) {
    // LayoutAnimation.spring()
    const borderRightWidth = index % 1 > 0 ? 0 : 1
    const borderBottomWidth = this.state.items.length - 3 > index ? 1 : 0
    return (
      <TouchableOpacity
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
        {items.map((item, i) => (
          <Text onPress={() => this.checkItem(item)} key={i} style={styles.theValue}>
            {item}
          </Text>
        ))}
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={items}
            keyExtractor={item => item}
            renderItem={({ item, index }) => this.listItems(item, index)}
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            numColumns={3}
          />
        </View>
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
    borderRadius: 5,
    marginLeft: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.9,
    shadowColor: "black",
    justifyContent: "center",
    backgroundColor: "green"
  },
  clearButton: {
    borderRadius: 5,
    marginLeft: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.9,
    shadowColor: "black",
    justifyContent: "center",
    backgroundColor: "gray"
  },
  buttonText: {
    margin: 5,
    color: "white"
  }
})
