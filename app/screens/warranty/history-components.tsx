/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable indent */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/Text"
import { colors } from "../../theme"
import { toUpper } from "lodash"
import { TouchableOpacity } from "react-native-gesture-handler"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import { WarrantyStatusView } from "./warranty-status"
import { translate } from "../../i18n"

const LINETITLE: TextStyle = {
  color: colors.palette.black,
  fontSize: 14,
  paddingLeft: 4,
  paddingVertical: 8,
}

const LINEINFO: TextStyle = {
  color: colors.palette.black,
  fontSize: 14,
  textAlign: "left",
  paddingLeft: 8,
  paddingVertical: 8,
}

const LINEVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  flexDirection: "row",
  borderLeftColor: colors.palette.lightGrey,
  borderLeftWidth: 1,
  borderRightColor: colors.palette.lightGrey,
  borderRightWidth: 1,
  borderTopColor: colors.palette.lightGrey,
  borderBottomColor: colors.palette.lightGrey,
  borderBottomWidth: 1,
  paddingHorizontal: 4,
  marginLeft: 4,
  marginRight: 4,
}

const COLUMLINE: ViewStyle = {
  backgroundColor: colors.palette.lightGrey,
  height: "100%",
  width: 1,
}

const TITLEVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  width: "30%",
}

const BORDERTOP: ViewStyle = {
  borderTopWidth: 1,
}

const ROWVIEW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  margin: 4,
}

const CODETEXT: TextStyle = {
  fontSize: 14,
  color: colors.palette.action,
  fontWeight: "700",
}

const BOLDTEXT: TextStyle = {
  fontSize: 14,
  color: colors.palette.black,
  fontWeight: "bold",
}

const NORMALTEXT: TextStyle = {
  fontSize: 14,
  color: colors.palette.black,
}

const ITEMVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: 4,
  margin: 4,
  borderWidth: 1,
  borderColor: colors.palette.border,
}

const HEADER_STEPVIEW: ViewStyle = {
  backgroundColor: colors.palette.border,
  width: "25%",
}
const HEADER_ENDVIEW: ViewStyle = {
  backgroundColor: colors.palette.border,
  width: "35%",
}
const HEADER_NOTEVIEW: ViewStyle = {
  backgroundColor: colors.palette.border,
  width: "40%",
}

const LINE_STEPVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  width: "25%",
}
const LINE_ENDVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  width: "35%",
}
const LINE_NOTEVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  width: "40%",
}

const HEADER_TEXT: TextStyle = {
  alignSelf: "center",
  fontSize: 16,
  fontWeight: "bold",
  paddingTop: 8,
  paddingBottom: 8,
}
const PROCESSTEXT: TextStyle = {
  fontSize: 14,
  paddingTop: 8,
  paddingBottom: 8,
  paddingStart: 4,
}

const PROCESS_LINEVIEW: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.palette.white,
  borderColor: colors.palette.lightGrey,
  borderWidth: 1,
  borderTopWidth: 0,
}

const PROCESS_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}

const PROCESS_TEXT: TextStyle = {
  color: colors.palette.black,
  fontSize: 14,
  fontWeight: "normal",
}

const LINK_TEXT: TextStyle = {
  color: colors.palette.action,
  fontSize: 15,
  fontWeight: "bold",
}

const PROCESS_VIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  padding: 4,
  paddingBottom: 0,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: colors.palette.lightGrey,
  margin: 4,
}

const PROCESS_TEXTVIEW: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 4,
}

const NOTE_ITEMVIEW: ViewStyle = {
  backgroundColor: colors.palette.white,
  padding: 4,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: colors.palette.lightGrey,
  margin: 4,
}

export const WarrantyItem = ({ item, itemPress }: any) => {
  const {
    code = "",
    statusCode = "",
    name = "",
    serviceName = "",
    phone = "",
    dateCreated = "",
    model = "",
  } = item
  const onSelectItem = () => {
    itemPress(item)
  }
  return (
    <TouchableOpacity onPress={onSelectItem}>
      <View style={ITEMVIEW}>
        <View style={ROWVIEW}>
          <Text style={CODETEXT} text={code} weight="bold" />
          <WarrantyStatusView statusCode={statusCode} />
        </View>
        <View style={ROWVIEW}>
          <Text style={BOLDTEXT} text={name} weight="semiBold" />
          <Text style={NORMALTEXT} text={serviceName} />
        </View>
        <View style={ROWVIEW}>
          <Text style={BOLDTEXT} text={phone} weight="semiBold" />
          <Text style={NORMALTEXT} text={getFormatDate(dateCreated, dateFormat.LongDate)} />
        </View>
        <View style={ROWVIEW}>
          <Text style={NORMALTEXT} text={toUpper(model)} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const InforLine = ({ title, info, topline = false }) => {
  return (
    <View style={[LINEVIEW, topline && BORDERTOP]}>
      <View style={TITLEVIEW}>
        <Text style={LINETITLE} text={title} weight="semiBold" />
      </View>
      <View style={COLUMLINE} />
      <Text style={LINEINFO} text={info} />
    </View>
  )
}

export const TABLEHEADER = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.palette.lightGrey,
      }}
    >
      <View style={HEADER_STEPVIEW}>
        <Text style={HEADER_TEXT} text={"BƯỚC"} weight="semiBold" />
      </View>
      <View style={COLUMLINE} />
      <View style={HEADER_ENDVIEW}>
        <Text style={HEADER_TEXT} text={"KẾT THÚC"} weight="semiBold" />
      </View>
      <View style={COLUMLINE} />
      <View
        style={[
          HEADER_NOTEVIEW,
          { borderRightColor: colors.palette.lightGrey, borderRightWidth: 1 },
        ]}
      >
        <Text style={HEADER_TEXT} text={"GHI CHÚ"} weight="semiBold" />
      </View>
    </View>
  )
}

export const HistoryProcessLine = ({ step, end, note }) => {
  return (
    <View style={PROCESS_LINEVIEW}>
      <View style={LINE_STEPVIEW}>
        <Text style={PROCESSTEXT} text={step} />
      </View>
      <View style={COLUMLINE} />
      <View style={LINE_ENDVIEW}>
        <Text style={PROCESSTEXT} text={end} />
      </View>
      <View style={COLUMLINE} />
      <View
        style={[LINE_NOTEVIEW, { borderRightColor: colors.palette.lightGrey, borderRightWidth: 1 }]}
      >
        <Text style={PROCESSTEXT} text={note} />
      </View>
    </View>
  )
}

export const ProcessProduct = ({ item, onCode, onTimes }) => {
  const {
    code = "",
    model = "",
    serial = "",
    postProcess = "",
    afterProcess = "",
    timeofWarranty = 0,
  } = item
  return (
    <View style={PROCESS_VIEW}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => onCode(item)}>
          <Text style={LINK_TEXT} text={code} weight="bold" />
        </TouchableOpacity>
        <Text style={{ color: colors.palette.black, fontSize: 14 }} text={toUpper(model)} />
      </View>
      <View style={PROCESS_TEXTVIEW}>
        <Text
          style={PROCESS_TITLE}
          text={translate("warranty.history.detail.serial")}
          weight="semiBold"
        />
        <Text style={PROCESS_TEXT} text={serial} />
      </View>
      <View style={PROCESS_TEXTVIEW}>
        <Text
          style={PROCESS_TITLE}
          text={translate("warranty.history.detail.postProcess")}
          weight="semiBold"
        />
        <Text style={PROCESS_TEXT} text={postProcess} />
      </View>
      <View style={PROCESS_TEXTVIEW}>
        <Text
          style={PROCESS_TITLE}
          text={translate("warranty.history.detail.afterProcess")}
          weight="semiBold"
        />
        <Text style={PROCESS_TEXT} text={afterProcess} />
      </View>
      <View style={PROCESS_TEXTVIEW}>
        <Text
          style={PROCESS_TITLE}
          text={translate("warranty.history.detail.times")}
          weight="semiBold"
        />
        <TouchableOpacity onPress={() => onTimes(item)}>
          <Text style={LINK_TEXT} text={timeofWarranty} weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const NoteLine = ({ item, index }) => {
  const { createdDate, note } = item
  return (
    <View style={NOTE_ITEMVIEW}>
      <Text style={PROCESS_TEXT} text={getFormatDate(createdDate, dateFormat.LongDate)} />
      <View style={{ flexDirection: "row", marginTop: 4 }}>
        <View style={{ width: "20%", backgroundColor: colors.palette.white }}>
          <Text
            style={PROCESS_TITLE}
            text={translate("warranty.history.detail.notes")}
            weight="semiBold"
          />
        </View>
        <View style={{ flexShrink: 1, backgroundColor: colors.palette.white }}>
          <Text style={PROCESS_TEXT} text={note} numberOfLines={5} ellipsizeMode={"tail"} />
        </View>
      </View>
    </View>
  )
}

export const TimesItem = ({ item, itemPress, index }: any) => {
  const { code = "", statusCode = "", serviceName = "", dateCreated = "" } = item
  const onSelectItem = () => {
    itemPress(item)
  }

  const date = getFormatDate(dateCreated, dateFormat.LongDate)

  return (
    <TouchableOpacity onPress={onSelectItem}>
      <View style={ITEMVIEW}>
        <View style={ROWVIEW}>
          <Text style={NORMALTEXT} weight="semiBold">
            {`Lần ${index + 1}  `}
            <Text style={NORMALTEXT} weight="ilight">
              {date}
            </Text>
          </Text>
          <WarrantyStatusView statusCode={statusCode} />
        </View>
        <View style={ROWVIEW}>
          <Text style={CODETEXT} text={code} weight="bold" />
          <Text style={NORMALTEXT} text={serviceName} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
