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
              extraData={{ data: checkedItems.length }}
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
  theValue: {
    margin: 10,
    fontSize: 18
  },
  list: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: "95%",
    minHeight: 40
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
