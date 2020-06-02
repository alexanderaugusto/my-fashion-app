import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import { colors } from './utils/util'
import { getUser } from './redux/actions/userAction'

// Home Screens
import Home from './screens/HomeScreen/index'

// Cart Screens
import Cart from './screens/CartScreen/index'

// Favorite Screens
import Favorites from './screens/FavoriteScreen/index'

// Account Screens
import Account from './screens/AccountScreen/index'

// Other Screens
import Login from './screens/Login'

const Stack = createStackNavigator()

function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

function CartScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Carrinho" component={Cart} />
    </Stack.Navigator>
  )
}

function FavoritesScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favoritos" component={Favorites} />
    </Stack.Navigator>
  )
}

function AccountScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Conta" component={Account} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

function BottomMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon

          if (route.name === 'Home') {
            icon = "home"
          }
          else if (route.name === 'Carrinho') {
            icon = "shopping-cart"
          }
          else if (route.name === 'Favoritos') {
            icon = "heart"
          }
          else if (route.name === 'Conta') {
            icon = "user-circle"
          }

          return <FontAwesome5 name={icon} size={size} color={color} solid />
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.h5,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Carrinho" component={CartScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Conta" component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default function Routes() {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser()) }, [dispatch])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomMenu} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}