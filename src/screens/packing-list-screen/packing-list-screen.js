import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import { ListInput } from "../../components/list-input"

/*
  STEP SEVEN - b
  • Pass the current items thru to input-screen and display
  • Swap local state for navigation state on packing-list-screen
*/

export class PackingListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Packing List",
      headerRight: (
        <Text
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Input", {
              items: navigation.getParam("items", []),
              onAdd: navigation.getParam("onAdd", null),
              onClear: navigation.getParam("onClear", null)
            })
          }
        >
          Input
        </Text>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      items: [],
      onAdd: val => this.handleAddPress(val),
      onClear: () => this.handleClearPress()
    })
  }

  handleAddPress(value) {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    if (value) {
      const newItems = items.concat(value)
      navigation.setParams({ items: newItems })
    }
  }

  handleClearPress() {
    const { navigation } = this.props
    navigation.setParams({ items: [] })
  }

  checkItem(selected) {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    const newItems = items.filter(item => item !== selected)
    navigation.setParams({ items: newItems })
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
    const backgroundColor = index % 2 === 0 ? "dodgerblue" : "indigo"
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
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "bisque"
  }
})
