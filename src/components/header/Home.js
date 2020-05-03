import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { colors } from '../../utils/util'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function HeaderHome() {
  const [searchText, setSearchText] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/img/logo.png')}
        />
        <View style={styles.category}>
          <FontAwesome5 name="list-ul" size={16} color="#125e89" />
          <Text style={styles.categoryText}>Categorias</Text>
        </View>
      </View>
      <SearchBar
        round
        placeholder="Encontre aqui o melhor produto para você..."
        placeholderTextColor={colors.input.placeholder}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  logoContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 31,
  },
  category: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  categoryText: {
    color: "#125e89",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  searchInputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    color: colors.input.text,
    fontSize: 13
  }
})