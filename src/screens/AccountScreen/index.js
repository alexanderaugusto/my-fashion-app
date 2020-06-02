import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { Header } from '../../components'
import { useSelector } from 'react-redux'
import { colors } from '../../utils/util'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const orderList = [
  { icon: "cart-arrow-down", title: "Seus pedidos" },
  { icon: "exchange-alt", title: "Devoluções" }
]

const configList = [
  { icon: "user-circle", title: "Seus dados" },
  { icon: "map-marker-alt", title: "Seus endereços" },
  { icon: "credit-card", title: "Seus cartões" },
  { icon: "lock", title: "Alterar senha" },
  { icon: "cog", title: "Ajustes" },
]

export default function Account() {
  const { data } = useSelector(state => state.userReducer)

  return (
    <View style={styles.account}>
      <Header type="account" />

      <View style={styles.container}>
        <View style={styles.user}>
          <Image source={{ uri: data.image }} style={styles.avatar} />
          <Text style={styles.name}>{data.name}</Text>
        </View>

        <View style={styles.list}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={orderList}
            renderItem={({ item }) => {
              return (
                <ListItem
                  title={item.title}
                  leftIcon={<FontAwesome5 name={item.icon} size={20} color={colors.h3} />}
                  bottomDivider
                  chevron
                  titleStyle={styles.listTitle}
                />
              )
            }}
          />
        </View>

        <View style={styles.list}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={configList}
            renderItem={({ item }) => {
              return (
                <ListItem
                  title={item.title}
                  leftIcon={<FontAwesome5 name={item.icon} size={20} color={colors.h3} />}
                  bottomDivider
                  chevron
                  titleStyle={styles.listTitle}
                />
              )
            }}
          />
        </View>

        <Button
          title="Sair da Conta"
          containerStyle={styles.buttonLogoutContainer}
          buttonStyle={styles.buttonLogout}
          titleStyle={styles.buttonLogoutTitle}
        // onPress={() => handleLogin()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  account: {
    width: "100%",
    height: "100%"
  },  
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "92%",
    paddingVertical: 15
  },
  user: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 2
  },
  name: {
    fontSize: 18,
    color: colors.h3
  },
  list: {
    width: "100%",
  },
  listItem: {

  },
  listTitle: {
    color: colors.h3
  },
  buttonLogoutContainer: {
    width: "60%",
    justifyContent: "center"
  },
  buttonLogout: {
    backgroundColor: colors.primary,
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 2
  },
  buttonLogoutTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  }
})