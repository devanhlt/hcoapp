import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

interface LuckyDrawScreenProps extends NativeStackScreenProps<AppStackScreenProps<"LuckyDraw">> {}

export const LuckyDrawScreen: FC<LuckyDrawScreenProps> = observer(function LuckyDrawScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={$root}
      preset="fixed"
      headerComponent={
        <Header
          title="Quay số may mắn"
          style={{ backgroundColor: colors.palette.appblue }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.appblue}
      statusBarStyle="light-content"
    >
      <Text text="luckyDraw" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
