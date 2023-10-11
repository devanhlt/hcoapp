import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { openUrl } from "../../utils/common"
import { useStores } from "../../models"

interface SupportInformationScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"SupportInformation">> {}

export const SupportInformationScreen: FC<SupportInformationScreenProps> = observer(
  function SupportInformationScreen() {
    const {
      appStore: { getWarrantyInfo },
    } = useStores()

    const onCallSupport = () => {
      Linking.openURL(`tel:${getWarrantyInfo()["App.Warranty.Hotline"]}`)
    }
    const onCallHotline = () => {
      Linking.openURL(`tel:${getWarrantyInfo()["App.Warranty.CallCenter"]}`)
    }
    const onWarrantyOpen = () => {
      openUrl(getWarrantyInfo()["App.Warranty.HomePage"])
    }
    const onDVSiteOpen = () => {
      openUrl(getWarrantyInfo()["App.Warranty.Website"])
    }

    return (
      <Screen
        style={$root}
        preset="scroll"
        headerComponent={
          <Header
            title="Thông tin hỗ trợ"
            style={{ backgroundColor: colors.palette.dvred }}
            textStyle={{ color: "white" }}
            iconStyle={{ tintColor: "white" }}
          />
        }
        statusBarColor={colors.palette.dvred}
        statusBarStyle="light-content"
      >
        <View
          style={{ alignItems: "center", paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}
        >
          <Icon icon={"app_icon"} size={180} containerStyle={$appIcon} />
          <Text style={$title} preset="bold" text="HOTLINE HỖ TRỢ" />
          <View style={$subContainer}>
            <Icon
              icon={"call"}
              size={32}
              containerStyle={{ marginRight: spacing.xs }}
              onPress={onCallHotline}
            />
            <Text preset="formLabel" text={getWarrantyInfo()["App.Warranty.Hotline"]} />
          </View>
          <Text style={$title} preset="bold" text="TỔNG ĐÀI BẢO HÀNH" />
          <View style={$subContainer}>
            <Icon
              icon={"call"}
              size={32}
              containerStyle={{ marginRight: spacing.xs }}
              onPress={onCallSupport}
            />
            <Text preset="formLabel" text={getWarrantyInfo()["App.Warranty.CallCenter"]} />
          </View>
          <Text style={$title} preset="bold" text="TRA CỨU BẢO HÀNH" />
          <Text
            style={{
              textDecorationLine: "underline",
              color: colors.palette.link,
              textAlign: "center",
            }}
            text={getWarrantyInfo()["App.Warranty.HomePage"]}
            onPress={onWarrantyOpen}
          />
          <Text style={$title} preset="bold" text="WEBSITE ĐẠI VIỆT" />
          <Text
            onPress={onDVSiteOpen}
            style={{
              textDecorationLine: "underline",
              color: colors.palette.link,
              textAlign: "center",
            }}
            text={getWarrantyInfo()["App.Warranty.Website"]}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $appIcon: ViewStyle = {
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing.lg,
  height: 120,
}

const $subContainer: TextStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $title: TextStyle = {
  marginTop: spacing.lg,
  textAlign: "center",
}
