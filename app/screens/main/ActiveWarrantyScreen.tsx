import React, { FC, useRef, useState } from "react"
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
import { Button, Header, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { colors, spacing } from "../../theme"
import { Formik, FormikErrors, FormikValues } from "formik"
import * as Yup from "yup"
import { isEmail, isVietnamesePhoneNumber } from "../../utils/validate-input"
import { CodeScanner } from "../../components/code-scanner/scanner"
import { useStores } from "../../models"
import { translate } from "../../i18n"

interface ActiveWarrantyScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ActiveWarranty">> {}

const ChangePasswordSchema = Yup.object().shape({
  code: Yup.string().required("Chưa nhập mã."),
  phone: Yup.string().test("phone-check", "Chưa nhập số điện thoại.", isVietnamesePhoneNumber),
  customerName: Yup.string().required("Chưa nhập tên khách hàng."),
  address: Yup.string().required("Chưa nhập địa chỉ."),
  email: Yup.string()
    .optional()
    .test("email-check", "Email không hợp lệ", function testEmail(value) {
      return !value || (value && value.length === 0) || isEmail(value)
    }),
  id: Yup.string().optional(),
  note: Yup.string().optional(),
})

export const ActiveWarrantyScreen: FC<ActiveWarrantyScreenProps> = observer(
  function ActiveWarrantyScreen() {
    // Pull in one of our MST stores
    const {
      warrantyStore: { active },
    } = useStores()

    // Pull in navigation via hook
    const addressInput = useRef<TextInput>()
    const [showCamera, setShowCamera] = useState(false)
    const setFieldValueForm =
      useRef<
        (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>
      >(null)

    const openScanCode = () => {
      setShowCamera(true)
    }

    function ScancodeAccessory(props: TextFieldAccessoryProps) {
      return (
        <TouchableOpacity onPress={openScanCode} style={props.style}>
          <Icon size={32} icon={"ic_scan_qr_code"} color={colors.palette.neutral800} />
        </TouchableOpacity>
      )
    }

    const activeWarranty = (values) => {
      active({
        hiddenCode: values["code"],
        customerName: values["phone"],
        customerPhone: values["customerName"],
        customerAddress: values["address"],
        customerEmail: values["email"],
        customerIdentityCard: values["id"],
        note: values["note"],
      }).then((res: any) => {
        if (res.error) {
          alert(translate(res.error.message))
        } else {
          alert("Kích hoạt mã thành công.")
        }
      })
    }

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Kích hoạt bảo hành"
            style={{ backgroundColor: colors.palette.dvred }}
            textStyle={{ color: "white" }}
            iconStyle={{ tintColor: "white" }}
          />
        }
        safeAreaEdges={["bottom"]}
        statusBarColor={colors.palette.dvred}
        statusBarStyle="light-content"
      >
        <Formik
          validationSchema={ChangePasswordSchema}
          initialValues={{
            code: "",
            phone: "",
            customerName: "",
            address: "",
            email: "",
            id: "",
            note: "",
          }}
          onSubmit={(values: FormikValues): void | Promise<any> => {
            activeWarranty(values)
          }}
        >
          {({ values, setFieldValue, submitForm, errors, touched }) => {
            setFieldValueForm.current = setFieldValue
            return (
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ margin: spacing.md }}>
                  <TextField
                    value={values["code"]}
                    onChangeText={(v) => setFieldValue("code", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.codeLabel"
                    placeholderTx="activeWarranty.codePlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    RightAccessory={ScancodeAccessory}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.code && touched.code ? `${errors.code}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["phone"]}
                    onChangeText={(v) => setFieldValue("phone", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.phoneLabel"
                    placeholderTx="activeWarranty.phonePlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.phone && touched.phone ? `${errors.phone}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["customerName"]}
                    onChangeText={(v) => setFieldValue("customerName", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.customerNameLabel"
                    placeholderTx="activeWarranty.customerNamePlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={
                      errors.customerName && touched.customerName
                        ? `${errors.customerName}`
                        : undefined
                    }
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["address"]}
                    onChangeText={(v) => setFieldValue("address", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.addressLabel"
                    placeholderTx="activeWarranty.addressPlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.address && touched.address ? `${errors.address}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                    multiline
                  />
                  <TextField
                    value={values["email"]}
                    onChangeText={(v) => setFieldValue("email", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.emailLabel"
                    placeholderTx="activeWarranty.emailPlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.email && touched.email ? `${errors.email}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["id"]}
                    onChangeText={(v) => setFieldValue("id", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.idLabel"
                    placeholderTx="activeWarranty.idPlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.id && touched.id ? `${errors.id}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["note"]}
                    onChangeText={(v) => setFieldValue("note", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    labelTx="activeWarranty.noteLabel"
                    placeholderTx="activeWarranty.notePlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.note && touched.note ? `${errors.note}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                    multiline
                  />

                  <Button
                    testID="done-button"
                    tx="activeWarranty.active"
                    style={$tapButton}
                    textStyle={$loginButton}
                    preset="reversed"
                    onPress={submitForm}
                  />
                </View>
              </ScrollView>
            )
          }}
        </Formik>
        <Modal
          visible={showCamera}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            setShowCamera(false)
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.palette.neutral900,
              paddingVertical: spacing.lg,
            }}
          >
            <View style={{ alignItems: "center", width: "80%", flex: 1, justifyContent: "center" }}>
              <CodeScanner
                isCameraActive={showCamera}
                onCodeDetected={(code) => {
                  setShowCamera(false)
                  setFieldValueForm.current("code", `${code}`)
                }}
              />
            </View>
            <Icon
              onPress={() => setShowCamera(false)}
              icon="x"
              size={48}
              color={colors.palette.white}
            />
          </View>
        </Modal>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
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

const $textField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.border,
}
