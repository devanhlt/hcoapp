import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, Text } from "../../components"
import { colors } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { RadioGroup } from "react-native-radio-buttons-group"
import SelectDropdown from "react-native-select-dropdown"
import { Camera, CameraType } from "react-native-camera-kit"
import { isEmpty, isNil, isUndefined } from "lodash"

interface DriveInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"DriveIn">> {}

export const DriveInScreen: FC<DriveInScreenProps> = observer(function DriveInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const types = ["Xe máy", "Xe đạp", "Ô tô"]
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Vé vãng lai (giờ)",
        value: "type_hour",
      },
      {
        id: "2",
        label: "Vé vãng lai (ngày/đêm)",
        value: "type_day",
      },
      {
        id: "3",
        label: "Vé tháng",
        value: "type_month",
      },
    ],
    [],
  )

  const [selectedId, setSelectedId] = useState<any>("1")
  const [photo, setPhoto] = useState<any>()
  const [selectedIndex, setSelectedIndex] = useState<any>(0)
  const [code, setCode] = useState("")

  const cameraRef = useRef<Camera>()

  const onCapturePressed = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.capture()
      setPhoto(uri)
    }
  }
  const removePhoto = () => {
    setPhoto(undefined)
  }

  const isValidFields = () => {
    return !isEmpty(code) && !isEmpty(photo) && !isNil(selectedIndex)
  }

  const submit = () => {
    if (isValidFields()) {
      console.log("CALL API")
      setPhoto(undefined)
      setSelectedId("1")
      setSelectedIndex(0)
      setCode("")
    } else {
      console.log("INVALID")
    }
  }

  return (
    <Screen
      style={$root}
      preset="fixed"
      headerComponent={
        <Header
          title="Xe vào"
          style={{ backgroundColor: colors.palette.appblue }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.appblue}
      statusBarStyle="light-content"
    >
      <View style={{ flex: 1, margin: 12 }}>
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 8,
            flex: 1,
            marginBottom: 12,
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          <Camera ref={cameraRef} cameraType={CameraType.Back} height={"100%"} />
          <View
            style={{
              left: 0,
              right: 0,
              position: "absolute",
              alignItems: "center",
              bottom: 12,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.palette.appblue,
                borderRadius: 12,
                paddingHorizontal: 24,
                paddingVertical: 8,
              }}
              onPress={onCapturePressed}
            >
              <Text
                style={{ alignSelf: "center", color: colors.palette.white, fontWeight: "bold" }}
              >
                Chụp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "30%",
                aspectRatio: 1,
                backgroundColor: "black",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image style={{ flex: 1 }} source={{ uri: photo }} />
              {photo && (
                <TouchableOpacity
                  onPress={removePhoto}
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    elevation: 4,
                    padding: 4,
                    borderRadius: 8,
                    right: 8,
                    bottom: 8,
                  }}
                >
                  <Icon icon="x" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "stretch", marginLeft: 12 }}>
              <TextInput
                style={{
                  backgroundColor: colors.palette.lightGrey,
                  borderRadius: 4,
                  color: colors.palette.black,
                  padding: 0,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 22,
                  textAlign: "center",
                }}
                value={code}
                onChangeText={setCode}
                placeholder="Nhập mã thẻ"
                numberOfLines={1}
                keyboardType="number-pad"
              />
              <RadioGroup
                containerStyle={{ alignItems: "flex-start", marginTop: 8 }}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 24 }}>
            <SelectDropdown
              buttonStyle={{
                borderWidth: 1,
                borderColor: colors.palette.lightGrey,
                flex: 2,
                backgroundColor: "white",
              }}
              data={types}
              onSelect={(selectedItem, index) => {
                setSelectedIndex(index)
              }}
              defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
              dropdownIconPosition="right"
              renderDropdownIcon={() => <Icon icon="caret_down" size={24} />}
            />
            <TouchableOpacity
              style={{
                backgroundColor: colors.palette.appblue,
                flex: 3,
                marginHorizontal: 12,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
              }}
              onPress={submit}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>Cho vào</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
