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
import { Header, Screen, Text, Icon } from "../../components"
import { colors, spacing, typography } from "../../theme"
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native"
import { debounce, isNil, map, omitBy, toUpper } from "lodash"
import { translate } from "../../i18n"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { EmptyView } from "../../components/empty-view"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import {
  HistoryProcessLine,
  InforLine,
  NoteLine,
  ProcessProduct,
  TABLEHEADER,
  WarrantyItem,
} from "./history-components"
import { useStores } from "../../models"
import { navNext } from "../navigators/navigationUtilities"

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
  backgroundColor: colors.palette.white,
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

const SECTION_HEADERVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  padding: 4,
  marginTop: 4,
}

const NoteSections = () => {
  return (
    <View style={SECTION_HEADERVIEW}>
      <Text style={{ fontWeight: "bold", fontSize: 14 }} text={"Ghi chú xử lý"} weight="semiBold" />
      {map(NOTE_DATA, (product, index) => (
        <NoteLine item={product} key={index} index={index} />
      ))}
    </View>
  )
}

const ProcessProductSection = ({ onProductCode, onWarrantyTime }) => {
  return (
    <View style={SECTION_HEADERVIEW}>
      <Text
        style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}
        text={"Sản phẩm xử lý"}
        weight="semiBold"
      />
      {map(PROCESS_PRODUCT, (product, index) => (
        <ProcessProduct
          item={product}
          onCode={onProductCode}
          onTimes={onWarrantyTime}
          key={index}
        />
      ))}
    </View>
  )
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

const HistoryProcessSection = () => {
  return (
    <View style={SECTION_HEADERVIEW}>
      <Text
        style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}
        text={"Lịch sử xử lý"}
        weight="semiBold"
      />
      <TABLEHEADER />
      <HistoryProcessLine
        step="Thực hiện"
        end={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
        note={""}
      />
      <HistoryProcessLine
        step="Thực hiện"
        end={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
        note={"Gia hạn đến ngày 20/05/2023 vì lý do: chờ LK"}
      />
      <HistoryProcessLine
        step="Thực hiện"
        end={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
        note={"Gia hạn đến ngày 20/05/2023 vì lý do: chờ LK"}
      />
      <HistoryProcessLine
        step="Thực hiện"
        end={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
        note={"Gia hạn đến ngày 20/05/2023 vì lý do: chờ LK"}
      />
      <HistoryProcessLine
        step="Thực hiện"
        end={getFormatDate("2023-07-04T10:08:47+07:00", dateFormat.LongDate)}
        note={"Gia hạn đến ngày 20/05/2023 vì lý do: chờ LK"}
      />
    </View>
  )
}

export const WarrantyDetailScreen = observer(function WarrantyDetailScreen(props: any) {
  // Pull in one of our MST stores
  const { item } = props.route.params

  const {
    warrantyStore,
    loadingStore: { loading },
  } = useStores()

  // const { getWarrantyDetail } = warrantyStore
  const onProductCode = (item) => {
    navNext("WarrantyProductDetail", { item: item })
  }

  const onWarrantyTime = (item) => {
    navNext("WarrantyTime", { item: item })
  }

  useEffect(() => {
    // getWarrantyDetail({ id: item.code || null })
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
          title="LỊCH SỬ BẢO HÀNH"
          style={{ backgroundColor: colors.palette.dvred }}
          textStyle={{ color: "white", fontSize: 14, textAlign: "center" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.dvred}
      statusBarStyle="light-content"
    >
      <SafeAreaView style={ROOT}>
        {loading.getWarrantyDetail1 ? (
          <ActivityIndicator
            size={16}
            color={colors.palette.link}
            style={{ marginTop: spacing.md }}
          />
        ) : (
          <ScrollView style={CONTENT} showsVerticalScrollIndicator={false}>
            <HeaderSection />
            <HistoryProcessSection />
            <ProcessProductSection onProductCode={onProductCode} onWarrantyTime={onWarrantyTime} />
            <NoteSections />
          </ScrollView>
        )}
      </SafeAreaView>
    </Screen>
  )
})
