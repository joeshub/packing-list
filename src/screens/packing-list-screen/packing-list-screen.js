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

  componentDidMount() {
    this.setNavState({
      inputValue: null,
      onAdd: () => this.handleAddPress(),
      onClear: () => this.handleClearPress(),
      setInputValue: val => this.handleInputValue(val)
    })
    AsyncStorage.getItem("items").then(response => {
      if (!response) {
        AsyncStorage.setItem("items", JSON.stringify([]))
        this.setNavState({ items: [] })
      } else {
        const items = JSON.parse(response)
        this.setNavState({ items })
      }
    })
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
      const newItems = items.concat(inputValue)
      this.setNavState({ items: newItems, inputValue: null })
      AsyncStorage.setItem("items", JSON.stringify(newItems))
    }
  }

  handleClearPress() {
    this.setNavState({ items: [], inputValue: null })
    AsyncStorage.setItem("items", JSON.stringify([]))
  }

  checkItem(selected) {
    const { navigation } = this.props
    const items = navigation.getParam("items", [])
    const newItems = items.filter(item => item !== selected)
    this.setNavState({ items: newItems })
    AsyncStorage.setItem("items", JSON.stringify(newItems))
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
