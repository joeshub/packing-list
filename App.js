import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"

/*
  STEP FOUR
  • Add ability to "check" an item
  • Intro to FlatList
  • Move styled list component to separate function
  • Update local state
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
    if (inputValue) {
      const newItems = [...items, { name: inputValue, checked: false }]
      this.setState({ items: newItems })
      this.input.clear()
    }
  }

  clearItems() {
    this.setState({ items: [] })
    this.input.clear()
  }
  checkItem = selectedItem => {
    const selectedName = selectedItem.name
    const newItems = this.state.items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })
    this.setState({ items: newItems })
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

  listItems = (item, index) => {
    const backgroundColor = item.checked ? "dodgerblue" : "indigo"
    return (
      <TouchableOpacity
        onPress={() => this.checkItem(item)}
        style={[styles.itemWrapper, { backgroundColor }]}
        key={index}
      >
        <Text style={styles.item}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {this.renderInputRow()}
          <View style={{ flexDirection: "row" }}>
            {items.map((item, i) => (
              <Text onPress={() => this.checkItem(item)} key={i} style={styles.theValue}>
                {item.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <View style={{ alignItems: "center", flexShrink: 1 }}>
            <FlatList
              data={items}
              extraData={{ data: items.length }}
              keyExtractor={item => item}
              renderItem={({ item, index }) => this.listItems(item, index)}
              contentContainerStyle={styles.listContainer}
              style={styles.list}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black"
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
  },
  list: {
    borderWidth: 1,
    borderColor: "lightgray"
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
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  }
})
