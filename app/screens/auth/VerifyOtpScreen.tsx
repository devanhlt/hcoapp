import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, TextField } from "../components"
import { colors, spacing } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"

interface VerifyOtpScreenProps extends NativeStackScreenProps<AppStackScreenProps<"VerifyOtp">> {}

export const VerifyOtpScreen: FC<VerifyOtpScreenProps> = observer(function VerifyOtpScreen(
  props: any,
) {
  const {
    route: {
      params: { phone },
    },
  } = props
  const [otp, setOTP] = useState("")

  const {
    authenticationStore: { verifyOTP },
  } = useStores()

  const navigation = useNavigation()

  const verify = () => {
    verifyOTP(phone, otp)
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="verifyOtp" />
      <TextField
        value={otp}
        onChangeText={setOTP}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="phone-pad"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        onSubmitEditing={verify}
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
