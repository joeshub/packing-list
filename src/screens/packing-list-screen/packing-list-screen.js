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
    items: [],
    checkedItems: []
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
      const newItems = [...items, inputValue]
      this.setState({ items: newItems })
      this.clearInput()
    }
  }

  handleClearPress() {
    this.setState({ items: [] })
    this.clearInput()
  }

  checkItem(selected) {
    const { checkedItems } = this.state
    let newCheckedItems
    if (checkedItems.includes(selected)) {
      newCheckedItems = checkedItems.filter(item => item !== selected)
    } else {
      newCheckedItems = [...checkedItems, selected]
    }
    this.setState({ checkedItems: newCheckedItems })
  }

  listItems = (item, index) => {
    const { checkedItems } = this.state
    const backgroundColor = checkedItems.includes(item) ? "dodgerblue" : "indigo"
    return (
      <TouchableOpacity
        onPress={() => this.checkItem(item)}
        style={[styles.itemWrapper, { backgroundColor }]}
        key={index}
      >
        <Text style={styles.item}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items, checkedItems } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          extraData={{ data: checkedItems.length }}
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
    margin: 2,
    flex: 1,
    justifyContent: "center"
  },
  item: {
    flex: 1,
    margin: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center"
  }
})
