import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

interface SelectRoleScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SelectRole">> {
  route: any
}

export const SelectRoleScreen: FC<SelectRoleScreenProps> = observer(function SelectRoleScreen(props) {
  const { authenticationStore: { selectUser } } = useStores()
  const {
    route: {
      params: {
        roles,
      },
    },
  } = props
  const handleSelectUser = (item) => {
    selectUser(item)
  }

  return (
    <Screen style={$root} preset="fixed" statusBarColor={colors.palette.neutral100}>
      <FlatList ItemSeparatorComponent={() => <View style={{ height: spacing.xs }} />}
                style={{
                  backgroundColor: colors.palette.neutral100,
                  padding: spacing.sm,
                  overflow: "hidden",
                }}
                data={roles} renderItem={({ item }) => {
        return <TouchableOpacity onPress={handleSelectUser.bind(null, item)}>
          <View style={{
            backgroundColor: colors.palette.neutral200,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            borderRadius: spacing.xs,
          }}>
            <Text>{item.name}</Text>
            <Text>{item.code}</Text>
          </View>
        </TouchableOpacity>
      }} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
