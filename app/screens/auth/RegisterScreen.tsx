import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextInput, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Button, Header, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { colors, spacing } from "../../theme"
import { Formik, FormikValues } from "formik"
import * as Yup from "yup"
import { useStores } from "../../models"
import ProcessingView from "../../components/ProcessingView"

const ChangePasswordSchema = Yup.object().shape({
  username: Yup.string().required("Chưa nhập họ và tên."),
  phone: Yup.string().required("Chưa nhập số điện thoại."),
  email: Yup.string().required("Chưa nhập email."),
  password: Yup.string().required("Chưa nhập mật khẩu."),
  refCode: Yup.string().required("Chưa nhập mã giới thiệu."),
})

interface RegisterScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Register">> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function ChangePasswordScreen() {
  const {
    authenticationStore: { changePassword },
    loadingStore: { loading },
  } = useStores()

  const authCurrentPasswordInput = useRef<TextInput>()
  const authPasswordInput = useRef<TextInput>()
  const authRePasswordInput = useRef<TextInput>()

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            style={props.style}
          >
            <Icon
              size={18}
              icon={isPasswordHidden ? "eye" : "eye_slash"}
              color={colors.palette.neutral800}
            />
          </TouchableOpacity>
        )
      },
    [isPasswordHidden],
  )

  return (
    <Screen
      style={$root}
      preset="fixed"
      headerComponent={
        <Header
          title="Đăng ký tài khoản"
          style={{ backgroundColor: colors.palette.appblue }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.appblue}
      statusBarStyle="light-content"
    >
      <Formik
        validationSchema={ChangePasswordSchema}
        initialValues={{
          username: "",
          phone: "",
          email: "",
          password: "",
          refCode: "",
        }}
        onSubmit={(values: FormikValues): void | Promise<any> => {
          changePassword(values["currpassword"], values["password"])
        }}
      >
        {({ values, setFieldValue, submitForm, errors, touched }) => (
          <ScrollView style={{ flex: 1, padding: spacing.md }}>
            <TextField
              value={values["name"]}
              onChangeText={(v) => setFieldValue("name", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoCorrect={false}
              labelTx="register.name"
              placeholderTx="register.namePlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.username && touched.username ? `${errors.username}` : undefined}
              HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
            />
            <TextField
              value={values["phone"]}
              onChangeText={(v) => setFieldValue("phone", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoCorrect={false}
              labelTx="register.phone"
              keyboardType="phone-pad"
              placeholderTx="register.phonePlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.phone && touched.phone ? `${errors.phone}` : undefined}
              HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
            />
            <TextField
              value={values["email"]}
              onChangeText={(v) => setFieldValue("email", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoCorrect={false}
              labelTx="register.email"
              placeholderTx="register.emailPlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.email && touched.email ? `${errors.email}` : undefined}
              HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
            />
            <TextField
              value={values["password"]}
              onChangeText={(v) => setFieldValue("password", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              labelTx="register.password"
              secureTextEntry={isPasswordHidden}
              placeholderTx="register.passwordPlaceholder"
              RightAccessory={PasswordRightAccessory}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.password && touched.password ? `${errors.password}` : undefined}
              HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
            />
            <TextField
              value={values["refCode"]}
              onChangeText={(v) => setFieldValue("refCode", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoCorrect={false}
              labelTx="register.refCode"
              placeholderTx="register.refCodePlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.refCode && touched.refCode ? `${errors.refCode}` : undefined}
              HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
            />

            <Button
              testID="done-button"
              tx="register.submit"
              style={$tapButton}
              textStyle={$loginButton}
              preset="reversed"
              onPress={submitForm}
            />
          </ScrollView>
        )}
      </Formik>
      {loading.changePassword && <ProcessingView isLoading={loading.changePassword} />}
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

const $loginButton: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 18,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.palette.neutral900,
  borderRadius: 8,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
}
