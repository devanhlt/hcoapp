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
import { colors, spacing, typography } from "../../theme"
import { useStores } from "../../models"
import { toUpper } from "lodash"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import { InforLine } from "./history-components"

const PROCESS_PRODUCT = [
  {
    code: "DSW-42010GD1",
    model: "máy lọc nước",
    serial: "U7MZF6J64G",
    postProcess: "MLN chảy nước ra nhà",
    afterProcess: "máy hoạt động bình thường",
    timeofWarranty: 2,
  },
  {
    code: "DSW-42010GD2",
    model: "máy làm mát",
    serial: "U7MZF6J64G",
    postProcess: "MLN chảy nước ra nhà",
    afterProcess: "máy hoạt động bình thường",
    timeofWarranty: 2,
  },
  {
    code: "DSW-42010GD3",
    model: "ghế massage",
    serial: "U7MZF6J64G",
    postProcess: "MLN chảy nước ra nhà",
    afterProcess: "máy hoạt động bình thường",
    timeofWarranty: 2,
  },
]

const NOTE_DATA = [
  {
    createdDate: "2023-07-04T10:08:47+07:00",
    note: "báo giá KH ok, hỗ trợ nhân công",
  },
  {
    createdDate: "2023-07-04T10:08:47+07:00",
    note: "Đế bằng siêu lõi lọc 137.000, vận chuyển 30.000. Công hỗ trợ, tổng 167.000",
  },
  {
    createdDate: "2023-07-04T10:08:47+07:00",
    note: "Hàng bị lỗi, sửa xong bị lỗi, đổi mới bị lỗi, đập luôn cũng bị lỗi, dị là hàng bị lỗi, chịu không nổi.",
  },
]

const CONTENT: ViewStyle = {
  backgroundColor: colors.palette.dividerGreyF5,
  flex: 1,
  marginTop: 4,
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

// var arr = ['a1', 'b1', 'c1'];
// console.log(arr.join(',')); // 'a1,b1,c1'

export const ProductDetailScreen = observer(function ProductDetailScreen(props: any) {
  // Pull in one of our MST stores
  const { item } = props.route.params

  const {
    warrantyStore,
    loadingStore: { loading },
  } = useStores()
  // const { getWarrantyProductDetail } = warrantyStore

  useEffect(() => {
    // getWarrantyProductDetail({ id: item.code || null })
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
          title="CHI TIẾT SẢN PHẨM BẢO HÀNH"
          style={{ backgroundColor: colors.palette.appblue }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.appblue}
      statusBarStyle="light-content"
    >
      <SafeAreaView style={ROOT}>
        {loading.getWarrantyProductDetail1 ? (
          <ActivityIndicator
            size={16}
            color={colors.palette.blue}
            style={{ marginTop: spacing.md }}
          />
        ) : (
          <ScrollView style={CONTENT} showsVerticalScrollIndicator={false}>
            <InforLine title={"Mã CA"} info={"CA-203405-257583"} topline={true} />
            <InforLine title={"Khách hàng"} info={"Nguyễn Thị Tuyết Nga"} />
            <InforLine title={"Điện thoại"} info={"0902786075"} />
            <InforLine title={"Trạng thái ca"} info={"Đã xử lý"} />
            <InforLine title={"Mã cào"} info={"U7MZF6J64M"} />
            <InforLine title={"Ngành hàng"} info={toUpper("máy làm mát")} />
            <InforLine
              title={"Ngày mua hàng"}
              info={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
            />
            <InforLine
              title={"Hạn bảo hành"}
              info={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
            />
            <InforLine title={"Trước xử lý"} info={"MLN chảy nước ra nhà"} />
            <InforLine title={"Nguyên nhân"} info={"Hở lõi lọc"} />
            <InforLine title={"Cách xử lý"} info={"Thay lõi lọc"} />
            <InforLine title={"Sau xử lý"} info={"Máy hoạt động bình thường"} />
            <InforLine
              title={"Linh kiện thay thế"}
              info={"Lõi lọc 1 10 PP - SL: 1 \nLõi lọc 2 10 PP - SL: 1"}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </Screen>
  )
})
