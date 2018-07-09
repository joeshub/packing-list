import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Button } from "./button"
import { colors } from "../theme/colors"

export class ListInput extends React.Component {
  render() {
    const { value, onChangeText, onAddItem } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref => (this.input = ref)}
            autoFocus
            style={styles.input}
            value={value}
            onChangeText={val => onChangeText(val)}
            onSubmitEditing={() => {
              this.input.clear()
              onAddItem()
            }}
            returnKeyType="done"
            placeholder="Enter Item"
            placeholderTextColor={colors.rainCloud}
          />
        </View>
        <Button text="Add item to List" onPress={() => onAddItem()} active={value} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%"
  },
  inputContainer: {
    height: 48,
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderColor: colors.clay,
    borderBottomWidth: 2,
    fontSize: 16,
    fontWeight: "300"
  }
})
