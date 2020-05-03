import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../utils/util'

// Headers
import HeaderHome from './Home'
import HeaderCart from './Cart'
import HeaderFavorites from './Favorites'
import HeaderAccount from './Account'
import HeaderScreens from './Screens'

export default function Header({ type, name }) {
  return (
    <View style={styles.container}>
      {
        (type === "home" && <HeaderHome />) ||
        (type === "cart" && <HeaderCart />) ||
        (type === "favorites" && <HeaderFavorites />) ||
        (type === "account" && <HeaderAccount />) ||
        (type === "screens" && <HeaderScreens name={name} />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.header.background,
    width: "100%",
    height: "auto",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.8,
    elevation: 2,
    borderBottomWidth: 2,
		borderBottomColor: '#ddd',
  }
})