import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen, Text, TextField } from "../../components"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "../../theme"

interface SendOtpScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SendOtp">> {}

export const SendOtpScreen: FC<SendOtpScreenProps> = observer(function SendOtpScreen() {
  const [username, setUsername] = useState("0981953112")
  const {
    authenticationStore: { sendLoginOTP },
  } = useStores()

  const navigation = useNavigation()

  const sendOTP = () => {
    sendLoginOTP(username)
      .then((response) => {
        navigation.navigate("VerifyOtp")
      })
      .catch((err) => {
        Alert.alert(JSON.stringify(err))
      })
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="sendOtp" />
      <TextField
        value={username}
        onChangeText={setUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="phone-pad"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        onSubmitEditing={sendOTP}
        LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
        inputWrapperStyle={$inputWrapperStyle}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
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
