import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import { ListInput } from "../../components/list-input"
/*
  STEP SEVEN - a
  • Create an input-screen
  • Integrate react-navigation
*/

export class PackingListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Packing List",
      headerRight: (
        <Text style={{ marginRight: 10 }} onPress={() => navigation.navigate("Input")}>
          Input
        </Text>
      )
    }
  }

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
        <FlatList
          data={items}
          keyExtractor={item => item}
          renderItem={({ item, index }) => this.listItems(item, index)}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          numColumns={3}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  list: {
    padding: 20,
    borderWidth: 1,
    borderColor: "lightgray"
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white"
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
