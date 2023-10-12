import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View } from "react-native"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { RadioGroup } from "react-native-radio-buttons-group"
import { DriveInScreenProps, $root } from "./DriveInScreen"

export const DriveInScreen: FC<DriveInScreenProps> = observer(function DriveInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Option 1",
        value: "option1",
      },
      {
        id: "2",
        label: "Option 2",
        value: "option2",
      },
    ],
    [],
  )

  const [selectedId, setSelectedId] = useState<any>()

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
      <View>
        <View style={{ flex: 1 }}>
          <Text>Camera</Text>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>Hình ảnh</Text>
            <View>
              <TextInput placeholder="Nhập mã thẻ" />
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </View>
          </View>
        </View>
        <Text>Xe vào</Text>
      </View>
    </Screen>
  )
})
