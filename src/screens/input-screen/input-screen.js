import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { ListInput } from "../../components/list-input"

export class InputScreen extends React.Component {
  constructor(props) {
    super(props)
    const items = props.navigation.getParam("items", [])
    this.state = { items }
  }

  clearInput() {
    const { navigation } = this.props
    const setInputValue = navigation.getParam("setInputValue", null)
    setInputValue(null)
  }

  handleInput(value) {
    const setInputValue = this.props.navigation.getParam("setInputValue", null)
    setInputValue(value)
  }

  handleAddPress() {
    const { navigation } = this.props
    const onAdd = navigation.getParam("onAdd", null)
    onAdd()
    navigation.goBack()
  }

  handleClearPress() {
    const { navigation } = this.props
    const onClear = navigation.getParam("onClear", null)
    onClear()
    this.setState({ items: [] })
    this.clearInput()
  }

  renderInputRow() {
    const { navigation } = this.props
    const inputValue = navigation.getParam("inputValue", null)
    const onAdd = navigation.getParam("onAdd", null)
    return (
      <ListInput
        value={inputValue}
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
