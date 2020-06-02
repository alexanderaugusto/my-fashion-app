import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../utils/util'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import formValidation from '../utils/formValidation'
import { login, register } from '../redux/actions/userAction'
import { useDispatch } from 'react-redux'

export default function Login() {
  const [screen, setScreen] = useState("login")
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ email: "", name: "", password: "", confirmPassword: "" })

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const onChangeLogin = (type, value) => setLoginData({ ...loginData, [type]: value })

  const onChangeRegister = (type, value) => setRegisterData({ ...registerData, [type]: value })

  const handleLogin = () => {
    dispatch(login(loginData, navigation))
  }

  const handleRegister = () => {
    dispatch(register(registerData, navigation))
  }

  return (
    <LinearGradient colors={['#0099CC', '#2A628F', '#13293D']} style={styles.gradient}>
      <TouchableOpacity style={styles.goBackContainer} activeOpacity={0.6}
        onPress={() => navigation.goBack()}>
        <FontAwesome5 name="reply" size={30} solid color="#FFFFFF" />
        <Text style={styles.goBackText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.overlay}>
          <Image style={styles.logo} source={require("../assets/img/logo.png")} />

          {screen === "login" ?
            <View style={styles.screenContainer}>
              <Text style={styles.title}>Fazer Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Email..."
                placeholderTextColor={colors.h4}
                textContentType="emailAddress"
                autoCompleteType="email"
                value={loginData.email}
                onChangeText={value => onChangeLogin("email", value)}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.h4}
                placeholder="Senha..."
                textContentType="password"
                secureTextEntry={true}
                value={loginData.password}
                onChangeText={value => onChangeLogin("password", value)}
              />
              <Text
                style={styles.forgetPassword}>
                Esqueceu sua senha?
              </Text>
              <Button
                title="Entrar"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                disabled={formValidation.login(loginData)}
                onPress={() => handleLogin()}
              />
              <Text style={styles.textCreate} onPress={() => setScreen("register")}>
                Ainda não possui conta? {" "}
                <Text style={styles.textCreateLink}>Cadastre-se!</Text>
              </Text>
            </View>
            :
            <View style={styles.screenContainer}>
              <Text style={styles.title}>Criar Conta</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome..."
                placeholderTextColor={colors.h4}
                textContentType="name"
                autoCompleteType="name"
                value={registerData.name}
                onChangeText={value => onChangeRegister("name", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email..."
                placeholderTextColor={colors.h4}
                textContentType="emailAddress"
                autoCompleteType="email"
                value={registerData.email}
                onChangeText={value => onChangeRegister("email", value)}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.h4}
                placeholder="Senha..."
                textContentType="password"
                secureTextEntry={true}
                value={registerData.password}
                onChangeText={value => onChangeRegister("password", value)}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.h4}
                placeholder="Confirmar senha..."
                textContentType="password"
                secureTextEntry={true}
                value={registerData.confirmPassword}
                onChangeText={value => onChangeRegister("confirmPassword", value)}
              />
              <Button
                title="Cadastrar"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                disabled={formValidation.register(registerData)}
                onPress={() => handleRegister()}
              />
              <Text style={styles.textCreate} onPress={() => setScreen("login")}>
                Já possui conta? {" "}
                <Text style={styles.textCreateLink}>Entrar!</Text>
              </Text>
            </View>

          }
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "95%",
    alignItems: "center",
    justifyContent: "center"
  },
  goBackContainer: {
    flexDirection: "row",
    width: "90%"
  },
  goBackText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginLeft: 10
  },
  overlay: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: "auto",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 10,
    alignItems: "center",
    padding: 10
  },
  logo: {
    width: 150,
    height: 47
  },
  title: {
    color: colors.h3,
    fontSize: 18,
    fontWeight: "bold",
    width: "90%",
    margin: 10
  },
  input: {
    backgroundColor: colors.background,
    color: colors.h2,
    borderRadius: 25,
    width: "95%",
    margin: 10,
    paddingLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 2
  },
  screenContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  forgetPassword: {
    width: "90%",
    color: colors.h2,
    textDecorationLine: "underline",
    marginTop: -5
  },
  button: {
    backgroundColor: colors.primary,
    width: "55%",
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    margin: 20,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 2
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold"
  },
  textCreate: {
    color: colors.h2,
    fontSize: 15
  },
  textCreateLink: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold"
  }
})