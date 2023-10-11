import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Modal, ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Button, Header, Icon, Screen, TextField } from "../../components"
import { colors, spacing } from "../../theme"
import { Formik, FormikErrors, FormikValues } from "formik"
import * as Yup from "yup"
import { CodeScanner } from "../../components/code-scanner/scanner"
import { useNavigation } from "@react-navigation/native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { dateFormat } from "../../utils/date-util"
import { formatDate } from "../../utils/formatDate"
import moment from "moment"

interface WarrantyInfoDateRangeScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"WarrantyInfoDateRange">> {}

const ChangePasswordSchema = Yup.object().shape({
  dateFrom: Yup.string().required("Chưa chọn ngày bắt đầu."),
  dateTo: Yup.string().required("Chưa chọn ngày kết thúc."),
})

export const WarrantyInfoDateRangeScreen: FC<WarrantyInfoDateRangeScreenProps> = observer(
  function WarrantyInfoDateRangeScreen() {
    const { navigate } = useNavigation()
    const addressInput = useRef<TextInput>()
    const [showCamera, setShowCamera] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isDateToPickerVisible, setDateToPickerVisibility] = useState(false)
    const [dateInPicker, setDateInPicker] = useState<Date>(moment().toDate())
    const [fromDate, setFromDate] = useState<Date>(moment().toDate())
    const [toDate, setToDate] = useState(moment().add(7, "days").toDate())
    const setFieldValueForm =
      useRef<
        (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>
      >(null)

    const showDatePicker = (isFrom = true) => {
      if (isFrom) {
        setDateInPicker(fromDate)
        setDatePickerVisibility(true)
      } else {
        setDateInPicker(toDate)
        setDateToPickerVisibility(true)
      }
    }

    const hideDatePicker = () => {
      if (isDatePickerVisible) {
        setDatePickerVisibility(false)
      } else {
        setDateToPickerVisibility(false)
      }
    }

    const handleConfirm = (date) => {
      hideDatePicker()
      if (isDatePickerVisible) {
        setDatePickerVisibility(false)
        setFromDate(moment(date).startOf("D").toDate())
        setFieldValueForm.current(
          "dateFrom",
          formatDate(moment(date).toISOString(), dateFormat.ShortDateDD),
        )
      } else {
        setDateToPickerVisibility(false)
        setToDate(moment(date).endOf("D").toDate())
        setFieldValueForm.current(
          "dateTo",
          formatDate(moment(date).toISOString(), dateFormat.ShortDateDD),
        )
      }
    }

    const openHistories = () => {
      navigate("WarrantyHistoryInfo", {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      })
    }

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Chọn khoảng thời gian"
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
            dateFrom: formatDate(moment(fromDate).toISOString(), dateFormat.ShortDateDD),
            dateTo: formatDate(moment(toDate).toISOString(), dateFormat.ShortDateDD),
          }}
          onSubmit={(values: FormikValues): void | Promise<any> => {
            openHistories()
          }}
        >
          {({ values, setFieldValue, submitForm, errors, touched }) => {
            setFieldValueForm.current = setFieldValue
            return (
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ margin: spacing.md }}>
                  <TextField
                    value={values["dateFrom"]}
                    onChangeText={(v) => setFieldValue("dateFrom", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    editable={false}
                    onPressIn={() => {
                      showDatePicker(true)
                    }}
                    labelTx="warrantyHistories.dateFromLabel"
                    placeholderTx="warrantyHistories.dateFromPlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.dateFrom && touched.dateFrom ? `${errors.dateFrom}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />
                  <TextField
                    value={values["dateTo"]}
                    onChangeText={(v) => setFieldValue("dateTo", v)}
                    containerStyle={$textField}
                    autoCorrect={false}
                    editable={false}
                    onPressIn={() => {
                      showDatePicker(false)
                    }}
                    labelTx="warrantyHistories.dateToLabel"
                    placeholderTx="warrantyHistories.dateToPlaceholder"
                    onSubmitEditing={() => addressInput.current?.focus()}
                    LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                    inputWrapperStyle={$inputWrapperStyle}
                    helper={errors.dateTo && touched.dateTo ? `${errors.dateTo}` : undefined}
                    HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                  />

                  <Button
                    testID="view-button"
                    tx="warrantyHistories.view"
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
        <DateTimePickerModal
          date={dateInPicker}
          isVisible={isDatePickerVisible || isDateToPickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
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
