//   EXAMPLE
//   =======
//
// const [isVisible,setIsVisible] = useState(false)
//
// <RangeDatePopup
//   isVisible={isVisible}
//   onClosed={onClose}
//   onSelected={onSelectItem}
// />

import * as React from "react"
import { FlatList, StyleSheet, TouchableOpacity, View, ViewStyle, Modal } from "react-native"
import { Button } from "../components"
import { colors, spacing } from "./../theme"
import { Text } from "./Text"
import moment from "moment"

export interface RangeDatePopupProps {
  isVisible: boolean
  onSelected?: (option: any, start: any, end: any) => void
  onClosed?: () => void
}

const CONTAINER: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: 8,
  flex: 1,
  padding: spacing.md,
  maxHeight: "90%",
  marginTop: spacing.lg,
}

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.palette.white,
    borderColor: colors.palette.subtext,
    borderWidth: 1,
    marginTop: spacing.xs,
  },
  closeButtonText: {
    color: colors.palette.subtext,
    fontSize: 14,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  itemLine: {
    backgroundColor: colors.palette.dividerGrey,
    height: 1,
    marginTop: spacing.sm,
  },
  itemListContainer: {
    backgroundColor: colors.palette.white,
  },
  itemListContent: {
    backgroundColor: colors.palette.white,
  },
  itemText: {
    color: colors.palette.black,
    fontSize: 16,
    marginTop: spacing.sm,
  },
  itemView: {
    backgroundColor: colors.palette.white,
  },
  title: {
    color: colors.palette.black,
    fontSize: 20,
    fontWeight: "500",
  },
})

const OPTION_DATA = [
  {
    name: "Hôm nay",
    id: "homnay",
  },
  {
    name: "Hôm qua",
    id: "homqua",
  },
  {
    name: "Tuần này",
    id: "tuannay",
  },
  {
    name: "Tuần trước",
    id: "tuantruoc",
  },
  {
    name: "Tháng này",
    id: "thangnay",
  },
  {
    name: "Tháng trước",
    id: "thangtruoc",
  },
  {
    name: "Tuỳ chỉnh",
    id: "tuychinh",
  },
  {
    name: "Chọn theo tháng",
    id: "chonthang",
  },
]

export function RangeDatePopup(props: RangeDatePopupProps) {
  const { isVisible, onClosed, onSelected } = props

  let startTime = moment().startOf("month")
  let endTime = moment().endOf("day")

  const itemList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onSelectOption(item)}>
        <View style={styles.itemView}>
          <Text style={styles.itemText}>{item.shortName || item.name || item.description}</Text>
          <View style={styles.itemLine} />
        </View>
      </TouchableOpacity>
    )
  }

  const onSelectOption = (item) => {
    switch (item.id) {
      case "homnay": {
        startTime = moment().startOf("day")
        endTime = moment().endOf("day")
        break
      }
      case "homqua": {
        startTime = moment().subtract(1, "days").startOf("day")
        endTime = moment().subtract(1, "days").endOf("day")
        break
      }
      case "tuannay": {
        startTime = moment().startOf("isoWeek")
        endTime = moment().endOf("day")
        break
      }
      case "tuantruoc": {
        startTime = moment().subtract(1, "weeks").startOf("isoWeek")
        endTime = moment().subtract(1, "weeks").endOf("isoWeek")
        break
      }
      case "thangnay": {
        startTime = moment().startOf("month")
        endTime = moment().endOf("day")
        break
      }
      case "thangtruoc": {
        startTime = moment().subtract(1, "months").startOf("month")
        endTime = moment().subtract(1, "months").endOf("month")
        break
      }
      case "tuychinh": {
        break
      }
      case "all": {
        startTime = null
        endTime = null
        break
      }
      default:
        break
    }
    onSelected(item, startTime, endTime)
    onClosed()
  }

  return (
    <Modal visible={isVisible}>
      <View style={CONTAINER}>
        <Text text="Chọn khoảng thời gian" style={styles.title} />
        <FlatList
          data={OPTION_DATA}
          renderItem={itemList}
          keyExtractor={(item) =>
            (item.id && item.id.toString()) || (item.name && item.name.toString())
          }
          numColumns={1}
          style={styles.itemListContainer}
          contentContainerStyle={styles.itemListContent}
        />
        <Button
          style={styles.closeButton}
          textStyle={styles.closeButtonText}
          tx={"common.back"}
          onPress={onClosed}
        />
      </View>
    </Modal>
  )
}
