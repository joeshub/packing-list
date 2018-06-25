import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { ListInput } from "../../components/list-input"
import { Subscribe } from "unstated"
import { RootStore } from "../../app/root-component"

export class InputScreen extends React.Component {
  handleAddPress(store) {
    store.addItem()
  }

  handleClearPress(store) {
    store.clearItems()
  }

  renderInputRow(store) {
    return (
      <ListInput
        value={store.state.inputValue}
        onChangeText={value => store.handleInput(value)}
        onAddItem={() => this.handleAddPress(store)}
        onClearItems={() => this.handleClearPress(store)}
      />
    )
  }

  render() {
    return (
      <Subscribe to={[RootStore]}>
        {store => (
          <View style={styles.container}>
            {this.renderInputRow(store)}
            <View style={{ flexDirection: "row" }}>
              {store.state.items.map((item, i) => (
                <Text key={i} style={styles.theValue}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Subscribe>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  theValue: {
    margin: 10,
    fontSize: 18
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
