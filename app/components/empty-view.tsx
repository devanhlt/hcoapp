import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Icon } from "../components"
import { Text } from "."
import { colors, spacing } from "../theme"

type Props = {
  icon?: string
  message?: string
}

const TEXT: TextStyle = {
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.xs,
  marginTop: spacing.xs,
  color: colors.palette.black,
}
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  paddingVertical: spacing.xxxl,
}

const Empty = (props: any) => (
  <View style={CONTAINER}>
    {props.icon && (
      <Icon icon={props.icon} style={{}} color={colors.palette.dividerGrey} size={48} />
    )}
    {props.icon && <Text style={TEXT} text={props.message} />}
  </View>
)

export function EmptyView(props: Props) {
  return (
    <View>
      <Empty {...props} />
    </View>
  )
}
