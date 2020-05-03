import React from 'react'
import { StatusBar, YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import store from "./redux/store"
import { colors } from './utils/util'
import Routes from './routes'

StatusBar.setBackgroundColor(colors.primary)
StatusBar.setBarStyle("light-content")

YellowBox.ignoreWarnings(['Remote debugger'])

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}