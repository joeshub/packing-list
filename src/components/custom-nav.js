import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "../theme/colors"

export class CustomNav extends React.Component {
  render() {
    const { title } = this.props
    return (
      <View style={styles.root}>
        <Text textDecorationLine="underline" style={styles.title}>
          {title}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    width: "100%",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title: {
    color: colors.slate,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.7,
    bottom: 10
  }
})
