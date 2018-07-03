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
      checkedItems: [],
      onAdd: val => this.handleAddPress(val),
      onClear: () => this.handleClearPress()
    })
  }

  handleAddPress(inputValue) {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    if (inputValue) {
      const newItems = [...items, inputValue]
      navigation.setParams({ items: newItems })
    }
  }

  handleClearPress() {
    const { navigation } = this.props
    navigation.setParams({ items: [] })
  }

  checkItem(selected) {
    const { navigation } = this.props
    const checkedItems = navigation.getParam("checkedItems", [])
    let newCheckedItems
    if (checkedItems.includes(selected)) {
      newCheckedItems = checkedItems.filter(item => item !== selected)
    } else {
      newCheckedItems = [...checkedItems, selected]
    }
    navigation.setParams({ checkedItems: newCheckedItems })
  }

  listItems = (item, index) => {
    const checkedItems = this.props.navigation.getParam("checkedItems", [])
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
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    const checkedItems = navigation.getParam("checkedItems", [])
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
    flex: 1,
    margin: 2,
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center"
  }
})
