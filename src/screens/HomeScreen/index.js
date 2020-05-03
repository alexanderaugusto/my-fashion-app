import React, { useEffect } from 'react'
import { View, FlatList, Text, Image, StyleSheet } from 'react-native'
import { Header } from '../../components'
import { getAllProducts } from '../../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { colors, createRows, priceFormat } from '../../utils/util'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Home() {
  const { products } = useSelector(state => state.productReducer)
  const { favorites } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Header type="home" />

      <FlatList
        keyExtractor={item => item.id}
        data={createRows(products, 2)}
        numColumns={2}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={{ ...styles.item, backgroundColor: "transparent" }} />
          }

          return (
            <View style={styles.item}>
              <View style={styles.favoriteIcon}>
                <FontAwesome5 name="heart" size={20}
                  solid={!favorites.every(product => product.id !== item.id)}
                  color={favorites.every(product => product.id !== item.id) ? colors.h3 : "#CF1F27 "} />
              </View>
              <Image style={styles.productImage}
                source={{ uri: api.routes.FILES_URL + item.images[0].name }} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{priceFormat(item.price)}</Text>
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