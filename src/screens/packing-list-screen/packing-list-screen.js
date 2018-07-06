import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from "react-native"
import { ListInput } from "../../components/list-input"

/*
  STEP EIGHT
  • Bring in AsyncStorage
  • Store updated items in AsyncStorage
  • Persisted state (close & re-open app with same data)
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
              onClear: navigation.getParam("onClear", null),
              inputValue: navigation.getParam("inputValue", null),
              setInputValue: navigation.getParam("setInputValue", null)
            })
          }
        >
          Input
        </Text>
      )
    }
  }

  refreshData = async () => {
    const items = await AsyncStorage.getItem("items")
    if (!items) {
      AsyncStorage.setItem("items", JSON.stringify([]))
      this.setNavState({ items: [] })
    } else {
      const refreshedItems = JSON.parse(items)
      this.setNavState({ items: refreshedItems })
    }
  }

  componentDidMount() {
    this.setNavState({
      inputValue: null,
      onAdd: () => this.handleAddPress(),
      onClear: () => this.handleClearPress(),
      setInputValue: val => this.handleInputValue(val)
    })
    this.refreshData()
  }

  setNavState(newState) {
    const currentState = this.props.navigation.state.params
    this.props.navigation.setParams({ ...newState })
  }

  handleInputValue(value) {
    this.setNavState({ inputValue: value })
  }

  handleAddPress() {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    const inputValue = navigation.getParam("inputValue", null)
    if (inputValue) {
      const newItems = [...items, { name: inputValue, checked: false }]
      AsyncStorage.setItem("items", JSON.stringify(newItems))
      this.setNavState({ items: newItems, inputValue: null })
      navigation.goBack(null)
    }
  }

  handleClearPress() {
    this.setNavState({ items: [], inputValue: null })
    AsyncStorage.setItem("items", JSON.stringify([]))
  }

  checkItem(selectedItem) {
    const { navigation } = this.props
    const selectedName = selectedItem.name
    const items = navigation.getParam("items", [])
    const newItems = items.map(item => {
      const { name, checked } = item
      return name === selectedName ? { name: name, checked: !checked } : item
    })

    AsyncStorage.setItem("items", JSON.stringify(newItems))
    this.setNavState({ items: newItems })
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
    flex: 1,
    margin: 2,
    justifyContent: "center"
  },
  item: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "bisque",
    alignSelf: "center"
  }
})
