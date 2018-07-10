import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from "react-native"
import { ListInput } from "../components/list-input"
import { Subscribe } from "unstated"
import { RootStore } from "../app/root-component"
/*
  STEP NINE
  • Manage state with Unstated (https://github.com/jamiebuilds/unstated)
  • Persist data with AsyncStorage in root-component exercise <==
  • Convert packing-list-screen & input-screen → Tabs Navigator
*/

export class PackingListScreen extends React.Component {
  listItems(item, index, store) {
    const backgroundColor = item.checked ? "dodgerblue" : "indigo"
    return (
      <TouchableOpacity
        onPress={() => store.checkItem(item, store)}
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
      <Subscribe to={[RootStore]}>
        {store => (
          <View style={styles.container}>
            <FlatList
              data={store.state.items}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({ item, index }) => this.listItems(item, index, store)}
              contentContainerStyle={styles.listContainer}
              style={styles.list}
              numColumns={3}
            />
          </View>
        )}
      </Subscribe>
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
