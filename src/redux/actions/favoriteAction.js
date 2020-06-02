import api from "../../services/api"
import AsyncStorage from '@react-native-community/async-storage'
import { getUser } from "../actions/userAction"

export const insertFavoriteItem = (product_id, navigation) => async dispatch => {
  console.log("two =>" + await AsyncStorage.getItem("user-token"))
  if (!await AsyncStorage.getItem("user-token"))
    return navigation.navigate("Login")

  const data = {
    product_id
  }

  const config = {
    headers: {
      "Authorization": "Bearer " + await AsyncStorage.getItem("user-token")
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_FAVORITE_INSERT, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const deleteFavoriteItem = (product_id, navigation) => async dispatch => {
  if (!await AsyncStorage.getItem("user-token"))
    return navigation.navigate("Login")

  const config = {
    headers: {
      "Authorization": "Bearer " + await AsyncStorage.getItem("user-token")
    },
    data: { product_id }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.delete(api.routes.ROUTE_FAVORITE_DELETE_PRODUCT, config, null, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}