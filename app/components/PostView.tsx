import React from "react"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Text } from "./Text"
import { numberWithThousandSeparator } from "../utils/common"
import { Chip } from "./Chip"
import { MediaView } from "./MediaView"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { dateFormat, getFormatDate } from "../utils/date-util"
import stc from "string-to-color"

export const PostView = ({ postItem }: { postItem: any }) => {
  const renderComment = () => (
    <View>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          color: colors.title,
          fontSize: 14,
          lineHeight: 18,
          textAlignVertical: "center",
          marginHorizontal: 4,
          fontWeight: "700",
          width: "100%",
          paddingTop: 0,
          paddingBottom: 0,
          paddingHorizontal: 4,
          marginTop: 12,
        }}
      >
        Bình luận
      </Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 12,
          paddingVertical: 4,
          backgroundColor: colors.background,
          margin: 4,
          borderRadius: 99,
        }}
      >
        <Text
          text="Xem mọi người đang nói gì..."
          style={{ color: colors.subtitle, fontSize: 14 }}
        />
      </TouchableOpacity>
    </View>
  )
  return (
    <View key={postItem.id} style={$postContainer}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          paddingLeft: 8,
          paddingRight: 12,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            padding: 2,
            borderRadius: 99,
            borderColor: colors.primary,
          }}
        >
          <Image
            source={{ uri: postItem.avatar }}
            style={{ width: 28, aspectRatio: 1, borderRadius: 24 }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 6, alignSelf: "center" }}>
          <Text
            style={{
              color: colors.title,
              fontSize: 12,
              lineHeight: 14,
              fontWeight: "bold",
            }}
          >
            {postItem.name}
          </Text>
          <Text
            style={{
              color: colors.subtitle,
              fontSize: 10,
              lineHeight: 12,
            }}
          >
            {getFormatDate(postItem.createdAt, dateFormat.ShortDate)}
          </Text>
        </View>
        <FontAwesomeIcon icon="bookmark" size={18} color={colors.transparent20} />
      </View>
      <View>
        <MediaView
          medias={postItem.medias}
          style={{
            width: "100%",
            aspectRatio: 4 / 3,
            flexDirection: "row",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            top: 4,
            left: 0,
            right: 0,
          }}
        >
          <Chip
            label={postItem.category}
            onPress={() => {}}
            color={colors.white}
            backgroundColor={colors.transparent50}
            icon={"code-branch"}
            textStyle={{ fontWeight: "bold" }}
          />
          <Chip
            label={postItem.address || "Liên hệ"}
            onPress={() => {}}
            color={colors.white}
            backgroundColor={colors.transparent50}
            icon={"location-arrow"}
            textStyle={{ fontWeight: "bold" }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "stretch",
          padding: 4,
          paddingBottom: 8,
          marginTop: 4,
        }}
      >
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            color: colors.title,
            fontSize: 16,
            lineHeight: 18,
            textAlignVertical: "center",
            marginHorizontal: 4,
            fontWeight: "700",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {postItem.sumary}
        </Text>
        <Text
          ellipsizeMode="tail"
          style={{
            color: colors.primary,
            marginHorizontal: 4,
            marginTop: 4,
            marginBottom: 8,
            fontSize: 16,
            lineHeight: 16,
            fontWeight: "700",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {numberWithThousandSeparator(postItem.price, ".")} đ
        </Text>

        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          {postItem.tags.split(",").map((item) => {
            return <Chip key={item} label={item} onPress={() => {}} color={stc(item)} />
          })}
        </View>
        {renderComment()}
      </View>
    </View>
  )
}

const $postContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors.white,
}
