import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"

export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  title?: string,
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title, style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Icon icon={"back"} size={32} style={{ margin: 8 }} />
      <Text size={"lg"} weight={"normal"} style={{ flex: 1, margin: 8 }}>{title}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  height: 56,
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
}
