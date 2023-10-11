import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Modal,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { EnvironmentsPopup } from "../../components/EnvironmentsPopup"
import { colors, spacing } from "../../theme"
import * as Application from "expo-application"
import ProcessingView from "../../components/ProcessingView"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const navigation = useNavigation()
  const {
    authenticationStore: { login, setAuthResult },
    environmentStore: { currentEnvironment },
  } = useStores()
  const authPasswordInput = useRef<TextInput>()
  const authPhoneInput = useRef<TextInput>()
  const [username, setUsername] = useState("giang.test01")
  const [password, setPassword] = useState("Test!234")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appInfo, setAppInfo] = useState("")
  const [changeEnvTapTimes, setChangeEnvTapTimes] = useState(0)

  useEffect(() => {
    setAppInfo(
      `${Application.applicationName}\nv${Application.nativeApplicationVersion}_${Application.nativeBuildVersion} - ${currentEnvironment}`,
    )
  }, [currentEnvironment])

  const changeEnvironment = () => {
    if (changeEnvTapTimes > 3) {
      setChangeEnvTapTimes(0)
      setVisible(true)
    } else {
      setChangeEnvTapTimes(changeEnvTapTimes + 1)
    }
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
            style={props.style}
          >
            <Icon
              size={18}
              icon={isAuthPasswordHidden ? "eye" : "eye_slash"}
              color={colors.palette.neutral800}
            />
          </TouchableOpacity>
        )
      },
    [isAuthPasswordHidden],
  )

  const handleLogin = () => {
    setLoading(true)
    login(username, password).then((result) => {
      setLoading(false)
      setAuthResult(result)
    })
    // login(username, password).then((res) => {
    //   // @ts-ignore
    //   navigation.navigate("SelectRole", { roles: res })
    // })
  }

  const loginOTP = () => {
    // @ts-ignore
    navigation.navigate("SendOtp")
  }

  const forgotPassword = () => {
    navigation.navigate("ResetPassword")
  }

  function handleRegister() {
    navigation.navigate("Register")
  }

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Icon icon={"app_icon"} size={220} containerStyle={$appIcon} />

        <TextField
          ref={authPhoneInput}
          value={username}
          onChangeText={setUsername}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="phone-pad"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
          LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
          inputWrapperStyle={$inputWrapperStyle}
        />

        <TextField
          ref={authPasswordInput}
          value={password}
          onChangeText={setPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={handleLogin}
          RightAccessory={PasswordRightAccessory}
          LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
          inputWrapperStyle={$inputWrapperStyle}
        />

        <View style={$forgotPassView}>
          <TouchableOpacity onPress={forgotPassword}>
            <Text style={$forgotPassText} tx={"loginScreen.forgotPass"} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignInOtp"
            style={$tapOTPButton}
            textStyle={$loginOTPButton}
            preset="reversed"
            onPress={loginOTP}
          />
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            textStyle={$loginButton}
            preset="reversed"
            onPress={handleLogin}
          />
        </View>

        <Button
          testID="register-button"
          tx="loginScreen.registerTitle"
          style={$tapButton}
          textStyle={$loginButton}
          preset="reversed"
          onPress={handleRegister}
        />

        <Text text={appInfo} style={$version} onPress={changeEnvironment} />
      </ScrollView>
      <Modal visible={visible}>
        <EnvironmentsPopup dismiss={() => setVisible(false)} />
      </Modal>
      {loading && <ProcessingView isLoading={loading} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
}

const $version: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 14,
  marginTop: 24,
  textAlign: "center",
}

const $textField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.border,
}

const $forgotPassView: ViewStyle = {
  marginVertical: spacing.sm,
  width: "100%",
  justifyContent: "flex-end",
  flexDirection: "row",
}

const $forgotPassText: TextStyle = {
  fontSize: 16,
  color: colors.palette.angry500,
  textDecorationLine: "underline",
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.palette.neutral900,
  borderRadius: 8,
  flex: 0.47,
}

const $tapOTPButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.palette.neutral900,
  borderWidth: 2,
  borderRadius: 8,
  flex: 0.47,
}

const $loginButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 18,
}
const $loginOTPButton: TextStyle = {
  color: colors.palette.neutral900,
  fontSize: 18,
}

const $appIcon: ViewStyle = {
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 0,
}
