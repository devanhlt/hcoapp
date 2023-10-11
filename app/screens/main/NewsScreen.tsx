import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { WebView } from "react-native-webview"

interface NewsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"News">> {}

export const NewsScreen: FC<NewsScreenProps> = observer(function NewsScreen() {
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
          title="Tin tức"
          style={{ backgroundColor: colors.palette.dvred }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.dvred}
      statusBarStyle="light-content"
    >
      <WebView source={{ uri: "https://tapdoandaiviet.com.vn/tin-tuc.html" }} style={{ flex: 1 }} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
