import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Modal, TextStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import { EnvironmentsPopup } from "../components/EnvironmentsPopup"
import { colors } from "../theme"
import * as Application from "expo-application"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {

  const navigation = useNavigation()
  const {
    authenticationStore: { login },
    environmentStore: { currentEnvironment },
  } = useStores()
  const [visible, setVisible] = useState(false)
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

  const handleLogin = () => {
    login("0981923777", "Test!234").then((res) => {
      // @ts-ignore
      navigation.navigate("SelectRole", { roles: res })
    })
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="login" />
      <Button text={"LOGIN"} onPress={handleLogin} />


      <Text text={appInfo} style={$version} onPress={changeEnvironment} />
      <Modal visible={visible}>
        <EnvironmentsPopup dismiss={() => setVisible(false)} />
      </Modal>
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
