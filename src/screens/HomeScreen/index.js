import React, { useEffect } from 'react'
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Header } from '../../components'
import { getAllProducts } from '../../redux/actions/productAction'
import { insertFavoriteItem, deleteFavoriteItem } from '../../redux/actions/favoriteAction'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { colors, createRows, priceFormat } from '../../utils/util'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

export default function Home() {
  const { products } = useSelector(state => state.productReducer)
  const { favorites } = useSelector(state => state.userReducer)
  const { loading } = useSelector(state => state.appReducer)
  const dispatch = useDispatch()

  const navigation = useNavigation()

  useEffect(() => { dispatch(getAllProducts()) }, [dispatch])

  const handleFavorite = (item) => {
    if (favorites.every(product => product.id !== item.id)) {
      dispatch(insertFavoriteItem(item.id, navigation))
    } else {
      dispatch(deleteFavoriteItem(item.id, navigation))
    }
  }
  
  return (
    <View style={styles.container}>
      <Header type="home" />

      <FlatList
        keyExtractor={item => item.id}
        data={createRows(products, 2)}
        numColumns={2}
        refreshing={loading}
        onRefresh={() => dispatch(getAllProducts())}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={{ ...styles.item, backgroundColor: "transparent" }} />
          }

          return (
            <View style={styles.item}>
              <TouchableOpacity style={styles.favoriteIcon}
                onPress={() => handleFavorite(item)}>
                <FontAwesome5 name="heart" size={20}
                  solid={!favorites.every(product => product.id !== item.id)}
                  color={favorites.every(product => product.id !== item.id) ? colors.h3 : "#CF1F27"}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => AsyncStorage.clear()}>
                <Image style={styles.productImage}
                  source={{ uri: api.routes.FILES_URL + item.images[0].name }} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{priceFormat(item.price)}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: "100%",
  },
  item: {
    flexGrow: 1,
    margin: 3,
    padding: 5,
    backgroundColor: "#FFFFFF",
    flexBasis: 0,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 1,
  },
  favoriteIcon: {
    alignItems: "flex-end",
    padding: 5,
    zIndex: 2
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: 'stretch',
    marginTop: -35,
  },
  productTitle: {
    color: colors.h3,
    fontSize: 15
  },
  productPrice: {
    color: colors.h2,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  }
})