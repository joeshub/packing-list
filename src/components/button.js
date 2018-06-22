import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"

export class Button extends React.Component {
  render () {
    const { onPress, text, clear } = this.props
    return (
      <TouchableOpacity
        style={[styles.root, { backgroundColor: clear ? "gray" : "green" }]}
        onPress={() => onPress()}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 5,
    marginLeft: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.9,
    shadowColor: "black",
    justifyContent: "center"
  },
  buttonText: {
    margin: 5,
    color: "white"
  }
})
