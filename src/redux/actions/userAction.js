import api from "../../services/api"
import AsyncStorage from '@react-native-community/async-storage'

export const getUser = (navigation, goBack) => async dispatch => {
  console.log(await AsyncStorage.getItem("user-token"))
  if (!await AsyncStorage.getItem("user-token"))
    return null

  const config = {
    headers: {
      "Authorization": "Bearer " + await AsyncStorage.getItem("user-token")
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.get(api.routes.ROUTE_USER_LIST, config, null, async (cod, message, payload) => {
    if (cod === 200) {
      dispatch({
        type: "GET_USER_INFO",
        payload
      })
      if (goBack)
        navigation.goBack()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const updateUser = (data, onSubmit, navigation) => async dispatch => {
  if (!await AsyncStorage.getItem("user-token"))
    return navigation.navigate("Login")

  const config = {
    headers: {
      "Authorization": "Bearer " + await AsyncStorage.getItem("user-token")
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.put(api.routes.ROUTE_USER_UPDATE, config, data, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
      onSubmit()
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const login = (data, navigation) => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_LOGIN, null, data, async (cod, message, payload) => {
    if (cod === 200) {
      await AsyncStorage.setItem("user-token", payload.token)
      dispatch(getUser(navigation, true))
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const register = (data, navigation) => async dispatch => {
  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_USER_INSERT, null, data, async (cod, message, payload) => {
    if (cod === 200) {
      await AsyncStorage.setItem("user-token", payload.token)
      dispatch(getUser(navigation, true))
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}

export const uploadImage = (image, navigation) => async dispatch => {
  if (!await AsyncStorage.getItem("user-token"))
    return navigation.navigate("Login")

  let formdata = new FormData()
  formdata.append("files", image)

  const config = {
    headers: {
      "Authorization": "Bearer " + await AsyncStorage.getItem("user-token"),
      'Content-Type': 'multipart/form-data'
    }
  }

  dispatch({ type: "START_LOADING" })
  await api.request.post(api.routes.ROUTE_USER_UPLOAD_IMAGE, config, formdata, (cod, message, payload) => {
    if (cod === 200) {
      dispatch(getUser())
    } else {
      dispatch({ type: "OPEN_ALERT", payload: { open: true, type: "error", message } })
    }
  })
  dispatch({ type: "STOP_LOADING" })
}
