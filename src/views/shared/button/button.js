import React from "react"
import { 
  StyleSheet,
  Text,
  TouchableOpacity } from "react-native"

const style = StyleSheet.create({
  button: {
    borderRadius: 5,
    marginLeft: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.9,
    shadowColor: "black",
    justifyContent: "center",
    backgroundColor: "gray"
  },
  buttonText: {
    margin: 5,
    color: "white"
  },
})

export class Button extends React.Component {
  render () {
    const props = this.props
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[style.button, props.style]}>
        <Text style={[style.buttonText, props.textStyle]}>
          {props.text || props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}