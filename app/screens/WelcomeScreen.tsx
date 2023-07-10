import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/hooks/useSafeAreaInsetsStyle"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {
}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { authenticationStore: { logout } } = useStores()

  return (
    <Screen
      style={{ backgroundColor: colors.palette.neutral100, padding: spacing.xs }}
      statusBarStyle={"dark-content"}
      statusBarColor={"white"}
      safeAreaEdges={["bottom"]}
    >
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
      </View>
      <Button text={"LOGOUT"} onPress={logout} />
    </Screen>
  )
})

const $topContainer: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.errorBackground,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
  flex: 1,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
