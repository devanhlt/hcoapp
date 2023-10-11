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
  currpassword: Yup.string().required("Chưa nhập mật khẩu hiện tại."),
  password: Yup.string().required("Chưa nhập mật khẩu mới."),
  repassword: Yup.string().test("passwords-match", "Mật khẩu chưa trùng nhau.", function (value) {
    return this.parent.password === value
  }),
})

interface ChangePasswordScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ChangePassword">> {}

export const ChangePasswordScreen: FC<ChangePasswordScreenProps> = observer(
  function ChangePasswordScreen() {
    const {
      authenticationStore: { changePassword },
      loadingStore: { loading },
    } = useStores()

    const authCurrentPasswordInput = useRef<TextInput>()
    const authPasswordInput = useRef<TextInput>()
    const authRePasswordInput = useRef<TextInput>()

    const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isRePasswordHidden, setIsRePasswordHidden] = useState(true)

    const CurrentPasswordRightAccessory = useMemo(
      () =>
        function PasswordRightAccessory(props: TextFieldAccessoryProps) {
          return (
            <TouchableOpacity
              onPress={() => setIsCurrentPasswordHidden(!isCurrentPasswordHidden)}
              style={props.style}
            >
              <Icon
                size={18}
                icon={isCurrentPasswordHidden ? "eye" : "eye_slash"}
                color={colors.palette.neutral800}
              />
            </TouchableOpacity>
          )
        },
      [isCurrentPasswordHidden],
    )
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

    const RePasswordRightAccessory = useMemo(
      () =>
        function PasswordRightAccessory(props: TextFieldAccessoryProps) {
          return (
            <TouchableOpacity
              onPress={() => setIsRePasswordHidden(!isRePasswordHidden)}
              style={props.style}
            >
              <Icon
                size={18}
                icon={isRePasswordHidden ? "eye" : "eye_slash"}
                color={colors.palette.neutral800}
              />
            </TouchableOpacity>
          )
        },
      [isRePasswordHidden],
    )

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Đổi mật khẩu"
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
            currpassword: "",
            password: "",
            repassword: "",
          }}
          onSubmit={(values: FormikValues): void | Promise<any> => {
            changePassword(values["currpassword"], values["password"])
          }}
        >
          {({ values, setFieldValue, submitForm, errors, touched }) => (
            <ScrollView style={{ flex: 1, padding: spacing.md }}>
              <TextField
                ref={authCurrentPasswordInput}
                value={values["currpassword"]}
                onChangeText={(v) => setFieldValue("currpassword", v)}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isCurrentPasswordHidden}
                labelTx="loginScreen.currentPasswordFieldLabel"
                placeholderTx="loginScreen.currentPasswordFieldPlaceholder"
                onSubmitEditing={() => authPasswordInput.current?.focus()}
                RightAccessory={CurrentPasswordRightAccessory}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={
                  errors.currpassword && touched.currpassword ? `${errors.currpassword}` : undefined
                }
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
              />
              <TextField
                ref={authPasswordInput}
                value={values["password"]}
                onChangeText={(v) => setFieldValue("password", v)}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isPasswordHidden}
                labelTx="loginScreen.newPasswordFieldLabel"
                placeholderTx="loginScreen.newPasswordFieldPlaceholder"
                onSubmitEditing={() => authRePasswordInput.current?.focus()}
                RightAccessory={PasswordRightAccessory}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={errors.password && touched.password ? `${errors.password}` : undefined}
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
              />

              <TextField
                ref={authRePasswordInput}
                value={values["repassword"]}
                onChangeText={(v) => setFieldValue("repassword", v)}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isRePasswordHidden}
                labelTx="loginScreen.reNewPasswordFieldLabel"
                placeholderTx="loginScreen.reNewPasswordFieldPlaceholder"
                onSubmitEditing={submitForm}
                RightAccessory={RePasswordRightAccessory}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={
                  errors.repassword && touched.repassword ? `${errors.repassword}` : undefined
                }
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
              />

              <Button
                testID="done-button"
                tx="common.confirm"
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
  },
)

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
