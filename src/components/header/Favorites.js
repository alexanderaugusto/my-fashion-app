import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../utils/util'

export default function HeaderFavorites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FontAwesome5 name="ellipsis-v" size={15} color={colors.header.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.header.title
  }
})