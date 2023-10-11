/* eslint-disable react-native/no-inline-styles */
import { get } from "lodash"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { translate } from "../../i18n"
import { colors, spacing } from "../../theme"

type Props = {
  statusCode?: any
  viewStyle?: ViewStyle
}

const COLOR_MAP = {
  NEW: "#3DA9FF",
  PREVIEW: "#FC9218",
  PROCESSING: "#CAC41D",
  UPDATING: "#CAC41D",
  APPROVED: "#4169E1",
  FINISHED: "#32CD32",
  REJECTED: "#EA2127",
  CANCELED: "#EA2127",
}

const TEXT: TextStyle = {
  color: colors.palette.white,
  fontSize: 12,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
}

export function WarrantyStatusView(props: Props) {
  const { statusCode, viewStyle } = props
  return (
    <View
      style={[
        {
          backgroundColor: get(COLOR_MAP, statusCode),
          borderColor: colors.palette.dividerGrey,
          borderWidth: 2,
          justifyContent: "center",
        },
        viewStyle,
      ]}
    >
      <Text text={translate(statusCode)} style={TEXT} />
    </View>
  )
}
