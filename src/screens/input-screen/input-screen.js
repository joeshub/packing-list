import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native"
import { ListInput } from "../../components/list-input"

export class InputScreen extends React.Component {
  state = { inputValue: null, items: [] }

  componentDidMount() {
    this.setState({ items: this.props.navigation.getParam("items", []) })
  }

  clearInput() {
    const { navigation } = this.props
    const onClear = navigation.getParam("onClear", null)
    onClear()
    this.setState({ inputValue: null, items: [] })
  }

  handleInput(value) {
    this.setState({ inputValue: value })
  }

  handleAddPress() {
    const onAdd = this.props.navigation.getParam("onAdd", null)
    if (this.state.inputValue) {
      onAdd(this.state.inputValue)
      this.props.navigation.goBack()
    }
  }

  handleClearPress() {
    this.setState({ items: [] })
    this.clearInput()
  }

  renderInputRow() {
    return (
      <ListInput
        value={this.state.inputValue}
        onChangeText={value => this.handleInput(value)}
        onAddItem={() => this.handleAddPress()}
        onClearItems={() => this.handleClearPress()}
      />
    )
  }

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        {this.renderInputRow()}
        <View style={{ flexDirection: "row" }}>
          {items.map((item, i) => (
            <Text key={i} style={styles.theValue}>
              {item}
            </Text>
          ))}
        </View>
      </View>
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
