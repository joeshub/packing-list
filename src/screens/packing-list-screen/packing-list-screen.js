import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import { ListInput } from "../../components/list-input"
/*
  STEP SIX
  • Create “components” folder - /components
  • Create Button component - in /button folder
  • Create ListInput Component - in /list-input

*/

export class PackingListScreen extends React.Component {
  state = {
    inputValue: null,
    items: []
  }

  clearInput() {
    this.setState({ inputValue: null })
  }

  handleInput(value) {
    this.setState({ inputValue: value })
  }

  handleAddPress = () => {
    const { inputValue, items } = this.state
    if (inputValue) {
      const newItems = items.concat(inputValue)
      this.setState({ items: newItems })
      this.clearInput()
    }
  }

  handleClearPress = () => {
    this.setState({ items: [] })
    this.clearInput()
  }

  checkItem(selected) {
    const { items } = this.state
    const newItems = items.filter(item => item !== selected)
    this.setState({ items: newItems })
  }

  renderInputRow() {
    const { inputValue } = this.state
    return (
      <ListInput
        value={inputValue}
        onChangeText={value => this.handleInput(value)}
        onAddItem={() => this.addNewItem()}
        onClearItems={() => this.clearItems()}
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
        <View style={styles.topContainer}>
          {this.renderInputRow()}
          <View style={{ flexDirection: "row" }}>
            {items.map((item, i) => (
              <Text onPress={() => this.checkItem(item)} key={i} style={styles.theValue}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <View style={{ alignItems: "center", flexShrink: 1 }}>
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
    fontSize: 12
  }
})
