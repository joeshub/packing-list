import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { colors } from "../theme/colors"

export class RecentlyAdded extends React.Component {
  render() {
    const { items, onClear } = this.props
    return (
      <View style={[styles.root]}>
        <View style={styles.headerContainer}>
          <Text style={styles.recentlyAdded}>Recently Added</Text>
          <Text onPress={() => onClear()} style={styles.clearAll}>
            Clear All
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {items.map((item, i) => (
            <View style={styles.itemWrapper} key={i}>
              <Text style={styles.item}>{item.name.toLowerCase()}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    width: "90%",
    borderRadius: 4
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10
  },
  recentlyAdded: {
    fontWeight: "bold",
    color: colors.clay
  },
  clearAll: {
    fontWeight: "500",
    color: colors.rainCloud
  },
  itemWrapper: {
    marginRight: 5,
    backgroundColor: colors.ghost,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    fontWeight: "500",
    color: colors.rainCloud,
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
})
