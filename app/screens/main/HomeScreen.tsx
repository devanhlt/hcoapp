import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackScreenProps, navNext } from "../../navigators"
import { useStores } from "../../models"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native-gesture-handler"
import ProcessingView from "../../components/ProcessingView"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { numberWithThousandSeparator } from "../../utils/common"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const {
    appStore: { getSetting },
    authenticationStore: { user },
    loadingStore: { loading },
    postStore: { listPost },
  } = useStores()
  const { navigate } = useNavigation()
  const [posts, setPosts] = useState([])
  const nextCursor = useRef(-1)

  useEffect(() => {
    listPost()
      .then((res) => {
        nextCursor.current = res.data.nextCursor
        setPosts(res.data.items)
      })
      .catch((err) => {
        console.log("LOGGGG", err)
      })
  }, [])

  const openProfile = () => {
    navNext("ProfileInformation")
  }

  const renderPost = (postItem: any) => {
    return (
      <View
        style={{
          alignItems: "center",
          borderRadius: 12,
        }}
      >
        <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
          <View
            style={{
              borderWidth: 1,
              padding: 2,
              borderRadius: 99,
              borderColor: colors.palette.blue,
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
                color: colors.palette.black,
                fontSize: 12,
                lineHeight: 14,
                fontWeight: "bold",
              }}
            >
              {postItem.name}
            </Text>
            <Text
              style={{
                color: colors.palette.neutral500,
                fontSize: 10,
                lineHeight: 12,
              }}
            >
              {getFormatDate(postItem.createdAt, dateFormat.ShortDate)}
            </Text>
          </View>
          <FontAwesomeIcon icon="bookmark" size={18} color={colors.palette.neutral500} />
        </View>
        <Image source={{ uri: postItem.medias[0].url }} style={{ width: "100%", aspectRatio: 1 }} />
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              marginVertical: 4,
              paddingVertical: 6,
              paddingLeft: 8,
              paddingRight: 12,
              backgroundColor: colors.palette.neutral200,
              borderRadius: 99,
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon="tag"
              size={16}
              style={{ marginRight: 8 }}
              color={colors.palette.neutral700}
            />
            <Text
              style={{
                color: colors.palette.neutral700,
                fontSize: 16,
                lineHeight: 18,
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
              }}
            >
              {postItem.category}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 4,
              paddingVertical: 6,
              paddingLeft: 8,
              paddingRight: 12,
              backgroundColor: colors.palette.neutral200,
              borderRadius: 99,
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon="coins"
              size={16}
              style={{ marginRight: 8 }}
              color={colors.palette.primary200}
            />
            <Text
              style={{
                color: colors.palette.neutral700,
                fontSize: 16,
                lineHeight: 18,
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
              }}
            >
              {numberWithThousandSeparator(postItem.price, ".")} đ
            </Text>
          </View>
          <View
            style={{
              marginVertical: 4,
              paddingVertical: 6,
              paddingLeft: 8,
              paddingRight: 12,
              backgroundColor: colors.palette.neutral200,
              borderRadius: 99,
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon="location-arrow"
              size={16}
              style={{ marginRight: 8 }}
              color={colors.palette.blue}
            />
            <Text
              style={{
                color: colors.palette.blue,
                fontSize: 16,
                lineHeight: 18,
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
              }}
            >
              {postItem.address}
            </Text>
          </View>
          <Text
            style={{
              color: colors.palette.black,
              fontSize: 16,
              lineHeight: 16,
              paddingVertical: 4,
            }}
          >
            {postItem.address}
          </Text>
          <Text
            style={{
              color: colors.palette.black,
              fontSize: 16,
              lineHeight: 16,
              paddingVertical: 4,
            }}
          >
            {postItem.sumary}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 8,
            }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              <FontAwesomeIcon
                icon="heart"
                style={{ marginRight: 16 }}
                size={24}
                color={colors.palette.neutral300}
              />
              <FontAwesomeIcon
                icon="comments"
                style={{ marginRight: 16 }}
                size={28}
                color={colors.palette.neutral300}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderFeedItem = ({ item }) => {
    switch (item.type) {
      case "ADS":
        break
      default:
        return renderPost(item)
    }
  }

  return (
    <Screen
      style={{ backgroundColor: colors.background }}
      statusBarStyle={"dark-content"}
      statusBarColor={"white"}
      showHeader={false}
    >
      <View style={{ flexDirection: "row", paddingHorizontal: 12, paddingVertical: 4 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            height: 48,
            borderRadius: 28,
            borderColor: colors.palette.appblue,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 24,
            paddingRight: 16,
          }}
          onPress={openProfile}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Đăng bài</Text>
          <Icon icon="add_promote" size={36} color="white" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: 48,
              height: 48,
              borderRadius: 28,
              borderWidth: 3,
              borderColor: colors.palette.appblue,
            }}
            onPress={openProfile}
          >
            <Image
              source={{ uri: user.avatar }}
              style={{ flex: 1, alignSelf: "stretch", borderRadius: 64, margin: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{ marginTop: 4 }}
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        data={posts}
        renderItem={renderFeedItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 16, backgroundColor: colors.palette.neutral200 }} />
        )}
      />
      {loading.getSetting && <ProcessingView isLoading={loading.getSetting} />}
    </Screen>
  )
})
