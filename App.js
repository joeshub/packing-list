import React, { Component } from "react"
import { StyleSheet, Text, View, TouchableOpacity, FlatList, LayoutAnimation } from "react-native"

export default class App extends Component {
  state = {
    items: ["socks", "toothbrush", "shoes", "T-shirts", "pants", "belt"]
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
    justifyContent: "center"
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
