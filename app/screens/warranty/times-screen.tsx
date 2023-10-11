/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { Header, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { debounce, isNil, map, omitBy, toUpper } from "lodash"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { InforLine, TimesItem } from "./history-components"
import { navNext } from "../navigators/navigationUtilities"

const DATA_LIST = [
  {
    code: "CA-230504-257583",
    statusCode: "APPROVED",
    name: "Nguyễn Thị Tuyết Nga",
    serviceName: "Chăm sóc lại",
    phone: "0902786075",
    dateCreated: "2023-07-04T10:08:47+07:00",
    model: "Máy lọc nước",
  },
  {
    code: "CA-230504-257581",
    statusCode: "FINISHED",
    name: "Nguyễn Thị Tuyết Vịt",
    serviceName: "Chăm sóc lại",
    phone: "0902786075",
    dateCreated: "2023-07-04T10:08:47+07:00",
    model: "Máy làm mát",
  },
]

const CONTENT: ViewStyle = {
  flex: 1,
}

const COLUMN: ViewStyle = {
  paddingTop: 8,
}

const HEADER: TextStyle = {
  fontWeight: "bold",
}
const ROOT: ViewStyle = {
  backgroundColor: colors.palette.white,
  flex: 1,
}

const HeaderSection = () => {
  return (
    <View style={COLUMN}>
      <InforLine title={"Khách hàng"} info={"Nguyễn Thị Tuyết Nga"} topline={true} />
      <InforLine title={"Điện thoại"} info={"0902786075"} />
      <InforLine title={"Trạng thái CA"} info={"Đã xử lý"} />
    </View>
  )
}

export const WarrantyTimesScreen = observer(function WarrantyTimesScreen(props: any) {
  // Pull in one of our MST stores
  const { item } = props.route.params

  const {
    warrantyStore,
    loadingStore: { loading },
  } = useStores()
  // const { getWarrantyTimesDetail } = warrantyStore
  const { navigate, goBack } = useNavigation()

  const onProductCode = (item) => {
    navNext("WarrantyDetail", { item: item })
  }

  const onCloseBtn = () => {
    goBack()
  }

  useEffect(() => {
    // getWarrantyTimesDetail({ id: item.code || null })
    //   .then((response) => {
    //     console.log(` $$$$$$$ Detail: ${JSON.stringify(response)}`)
    //   })
    //   .catch((error) => {
    //     console.log(` $$$$$ Detail Error: ${JSON.stringify(error)}`)
    //   })
  }, [])

  return (
    <Screen
      style={ROOT}
      preset="fixed"
      headerComponent={
        <Header
          title="SỐ LẦN BẢO HÀNH"
          style={{ backgroundColor: colors.palette.appblue }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.appblue}
      statusBarStyle="light-content"
    >
      <SafeAreaView style={ROOT}>
        {loading.getWarrantyTimesDetail1 ? (
          <ActivityIndicator
            size={16}
            color={colors.palette.blue}
            style={{ marginTop: spacing.md }}
          />
        ) : (
          <>
            <ScrollView style={CONTENT} showsVerticalScrollIndicator={false}>
              <HeaderSection />
              {map(DATA_LIST, (product, index) => (
                <TimesItem item={product} itemPress={onProductCode} key={index} index={index} />
              ))}
            </ScrollView>
            <View
              style={{
                backgroundColor: colors.palette.black,
                alignSelf: "center",
                justifyContent: "flex-end",
                borderRadius: 4,
                marginBottom: 16,
              }}
              onTouchStart={onCloseBtn}
            >
              <Text
                style={{ color: colors.palette.white, paddingHorizontal: 32, paddingVertical: 8 }}
                text={"Đóng"}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </Screen>
  )
})
