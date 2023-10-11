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
import { Icon } from "../components"
import { useNavigation } from "@react-navigation/native"
import { debounce, isNil, omitBy, toUpper } from "lodash"
import { useToast } from "react-native-styled-toast"
import { translate } from "../../i18n"
import { TouchableOpacity } from "react-native-gesture-handler"
import { EmptyView } from "../../components/empty-view"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import { RangeDatePopup } from "../../components/choose-range-date"
import { WarrantyItem } from "./history-components"
import { useStores } from "../../models"
import { SearchBar } from "../components/Searchbar"
import { navNext } from "../navigators/navigationUtilities"

const CONTENT: ViewStyle = {
  backgroundColor: colors.palette.dividerGreyF5,
  flex: 1,
}
const HEADER: TextStyle = {
  fontWeight: "bold",
}
const ROOT: ViewStyle = {
  backgroundColor: colors.palette.white,
  flex: 1,
}

const styles = StyleSheet.create({
  dateValueView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  filterIcon: {
    paddingRight: spacing.sm,
  },
  filterText: {
    alignSelf: "center",
    color: colors.palette.subtext,
    fontSize: 16,
    paddingStart: spacing.xs,
    textAlign: "center",
    width: "90%",
  },
  itemListContainer: {
    backgroundColor: colors.palette.white,
  },
  itemListContent: {
    paddingBottom: 0,
  },
  itemListView: {
    backgroundColor: colors.palette.white,
    paddingTop: 0,
  },
  searchIcon: {
    color: colors.palette.red,
    padding: spacing.xxs,
  },
  searchIconView: {
    borderColor: colors.palette.black,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedDateText: {
    color: colors.palette.subtext,
    fontSize: 16,
    fontWeight: "500",
  },
  selectedDateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingBottom: spacing.xs,
    paddingHorizontal: "10%",
  },
  timeFilterView: {
    borderBottomColor: colors.palette.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingVertical: spacing.xs,
  },
})

const TimeFilter = ({ value, handle }) => {
  return (
    <TouchableOpacity onPress={handle}>
      <View style={styles.timeFilterView}>
        <Text style={styles.filterText} text={value} />
        <Icon size={20} icon="more" style={styles.filterIcon} />
      </View>
    </TouchableOpacity>
  )
}

const SelectedDate = ({
  fromDate,
  toDate,
  chooseStartDate,
  chooseEndDate,
  searchHandle,
  canEdit = false,
}) => {
  return (
    <View style={styles.selectedDateView}>
      <TouchableOpacity onPress={chooseStartDate}>
        <View style={styles.dateValueView}>
          <Text
            text={translate("common.fromText")}
            style={[styles.selectedDateText, { color: colors.palette.black }]}
          />
          <Text
            text={getFormatDate(moment(fromDate).toISOString(), dateFormat.ShortDate)}
            style={[styles.selectedDateText, canEdit && { color: colors.palette.green188 }]}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={chooseEndDate}>
        <View style={styles.dateValueView}>
          <Text
            text={translate("common.toText")}
            style={[styles.selectedDateText, { color: colors.palette.black }]}
          />
          <Text
            text={getFormatDate(moment(toDate).toISOString(), dateFormat.ShortDate)}
            style={[styles.selectedDateText, canEdit && { color: colors.palette.green188 }]}
          />
        </View>
      </TouchableOpacity>
      {canEdit && (
        <TouchableOpacity onPress={searchHandle}>
          <View style={styles.searchIconView}>
            <Icon size={24} icon="search" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export const WarrantyListScreen = observer(function WarrantyListScreen() {
  // Pull in one of our MST stores
  const {
    warrantyStore,
    loadingStore: { loading },
  } = useStores()
  const [dataList, setDataList] = useState([])
  const { navigate } = useNavigation()
  const { toast } = useToast()
  // const { getWarrantyList } = warrantyStore
  const [searchText, setSearchText] = useState(null)
  const [data, setData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const [canEdit, setCanEdit] = useState(false)
  const START = moment().startOf("month")
  const END = moment()
  const [startDate, setFromDate] = useState(START)
  const [endDate, setToDate] = useState(END)
  const [chooseStart, setChooseStart] = useState(false)
  const [chooseEnd, setChooseEnd] = useState(false)
  const [rangeDateVisible, setRangeDateVisible] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const [option, setOption] = useState<any>({
    name: "Tháng này",
    id: "thangnay",
  })

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

  const currentPage = useRef(1)
  const hasNext = useRef(true)

  const loadMore = () => {
    if (hasNext.current) {
      currentPage.current += 1
      loadData()
    }
  }

  useEffect(() => {
    setData(DATA_LIST)
  }, [])

  const loadData = () => {
    setTotalCount(0)
    setData(DATA_LIST)
    // getWarrantyList(
    //   omitBy(
    //     {
    //       MaxResultCount: 25,
    //       CurrentPage: currentPage.current,
    //       Keyword: searchText,
    //       FromDate: startDate && moment(startDate).startOf("date").utc().format(),
    //       ToDate: endDate && moment(endDate).endOf("date").utc().format(),
    //       OrderBy: "creationTime desc",
    //     },
    //     isNil,
    //   ),
    // )
    //   .then((result) => {
    //     let newData = []
    //     if (currentPage.current === 1) {
    //       newData = [...result.items]
    //     } else {
    //       newData = [...data, ...result.items]
    //     }
    //     setData(newData)
    //     setTotalCount(result.totalCount)
    //     hasNext.current = newData.length < result.totalCount
    //   })
    //   .catch(() => {
    //     setData(DATA_LIST)
    //   })
  }

  useEffect(() => {
    if (option && option.id === "tuychinh") {
      setCanEdit(true)
    } else {
      setCanEdit(false)
    }
  }, [option])

  useEffect(() => {
    currentPage.current = 1
    loadData()
  }, [searchText, option])

  const search = debounce(
    (text) => {
      setSearchText(text)
    },
    600,
    { leading: false },
  )

  const onRefresh = () => {
    setRefreshing(true)
    currentPage.current = 1
    loadData()
    setRefreshing(false)
  }

  const itemPressed = (item) => {
    navNext("WarrantyDetail", { item: item, refreshList: onRefresh })
  }

  const warrantyItem = ({ item }) => {
    return <WarrantyItem item={item} itemPress={itemPressed} />
  }

  const showChooseStart = () => {
    if (canEdit) setChooseStart(true)
  }

  const showChooseEnd = () => {
    if (canEdit) setChooseEnd(true)
  }

  const handleChooseStart = (date) => {
    if (moment(date).isSameOrBefore(endDate, "date")) setFromDate(moment(date).startOf("day"))
    hideDatePicker()
  }

  const handleChooseEnd = (date) => {
    if (moment(date).isSameOrAfter(startDate, "date")) setToDate(moment(date).endOf("day"))
    hideDatePicker()
  }

  const handleSearch = () => {
    loadData()
  }

  const onSelectRangeDate = (option, start, end) => {
    setOption(option)
    if (option.id !== "tuychinh") {
      setFromDate(start)
      setToDate(end)
    }
  }

  const hideDatePicker = () => {
    setChooseStart(false)
    setChooseEnd(false)
    setDatePickerVisibility(false)
  }

  const showRangeDate = () => {
    setRangeDateVisible(true)
  }

  const closeRangeDate = () => {
    setRangeDateVisible(false)
  }

  const handleConfirm = (date) => {
    if (date > moment()) {
      return
    }
    hideDatePicker()
  }

  return (
    <Screen
      style={ROOT}
      preset="fixed"
      headerComponent={
        <Header
          title={`DANH SÁCH CA BẢO HÀNH (${totalCount})`}
          style={{ backgroundColor: colors.palette.dvred }}
          textStyle={{ color: "white", fontSize: 14, textAlign: "center" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.palette.dvred}
      statusBarStyle="light-content"
    >
      <TimeFilter value={option && option.name} handle={showRangeDate} />
      <SelectedDate
        fromDate={startDate}
        toDate={endDate}
        chooseStartDate={showChooseStart}
        chooseEndDate={showChooseEnd}
        searchHandle={handleSearch}
        canEdit={canEdit}
      />
      <SearchBar
        placeHolder={translate("warranty.history.list.searchHolder")}
        onChangeText={search}
      />
      <SafeAreaView style={ROOT}>
        <View style={CONTENT}>
          {currentPage.current > 1 && loading.getWarrantyList1 && (
            <ActivityIndicator
              size={16}
              color={colors.palette.blue}
              style={{ marginTop: spacing.md }}
            />
          )}
          {dataList && (
            <View style={styles.itemListView}>
              {loading.getWarrantyList1 && currentPage.current === 1 ? (
                <ActivityIndicator
                  size={16}
                  color={colors.palette.blue}
                  style={{ marginTop: spacing.md }}
                />
              ) : (
                <FlatList
                  removeClippedSubviews={false}
                  data={data}
                  renderItem={warrantyItem}
                  keyExtractor={(item) => item.name.toString() || item.code.toString()}
                  numColumns={1}
                  style={styles.itemListContainer}
                  contentContainerStyle={styles.itemListContent}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  ListEmptyComponent={() => {
                    return <EmptyView icon={"search"} message={"Không có dữ liệu"} />
                  }}
                />
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={chooseStart}
        mode="date"
        maximumDate={new Date()}
        date={startDate.toDate()}
        onConfirm={handleChooseStart}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={chooseEnd}
        mode="date"
        date={endDate.toDate()}
        maximumDate={new Date()}
        onConfirm={handleChooseEnd}
        onCancel={hideDatePicker}
      />
      <RangeDatePopup
        isVisible={rangeDateVisible}
        onClosed={closeRangeDate}
        onSelected={onSelectRangeDate}
      />
    </Screen>
  )
})
