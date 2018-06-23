import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Button } from "./button"

export class ListInput extends React.Component {
  render() {
    const { value, onChangeText, onAddItem, onClearItems } = this.props
    return (
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={value} onChangeText={val => onChangeText(val)} />
        <Button text="ADD" onPress={() => onAddItem()} />
        <Button text="Clear" clear onPress={() => onClearItems()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: "50%",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 5,
    fontSize: 16,
    backgroundColor: "white"
  },
  inputRow: {
    flexDirection: "row"
  }
})
