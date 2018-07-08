import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../theme/colors"

export class Button extends React.Component {
  render() {
    const { onPress, text, active } = this.props
    const { infiniteRed, rainCloud, dim, pureWhite } = colors
    return (
      <TouchableOpacity
        style={[styles.root, { backgroundColor: active ? infiniteRed : rainCloud }]}
        onPress={() => onPress()}
      >
        <Text style={[styles.buttonText, { color: active ? pureWhite : dim }]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    margin: 11,
    fontWeight: "500"
  }
})
