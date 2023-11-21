/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { AppStackScreenProps } from "../../navigators"
import { useStores } from "../../models"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native-gesture-handler"
import ProcessingView from "../../components/ProcessingView"
import { Image } from "react-native"
import { dateFormat, getFormatDate } from "../../utils/date-util"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { isEmpty } from "lodash"

interface CommentScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Comment">> {}

export const CommentScreen: FC<CommentScreenProps> = observer(function CommentScreen({ route }) {
  const { id, post } = route.params as any

  const {
    loadingStore: { loading },
    postStore: { listComment },
  } = useStores()
  const { navigate } = useNavigation()
  const [text, setText] = useState("")
  const [enableSend, setEnableSend] = useState(false)
  const [comments, setComments] = useState([
    {
      ...post,
      userName: post.name,
    },
  ])

  useEffect(() => {
    listComment({ ref_id: id })
      .then((res) => {
        setComments([...comments, ...res.data])
      })
      .catch((err) => {
        console.log("LOGGGG", err)
      })
  }, [])

  const onChangeText = (value) => {
    setText(value)
    setEnableSend(!isEmpty(value))
  }

  const sendComment = () => {
    // send comment
  }

  const renderCommentItem = ({ item }) => {
    return (
      <View
        style={{
          paddingVertical: 8,
          paddingLeft: 8,
          paddingRight: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ borderRadius: 99 }}>
            <Image
              source={{ uri: item.avatar }}
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
              {item.userName}
            </Text>
            <Text
              style={{
                color: colors.subtitle,
                fontSize: 10,
                lineHeight: 12,
              }}
            >
              {getFormatDate(item.createdAt, dateFormat.LongDate)}
            </Text>
          </View>
        </View>
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: colors.white,
            marginTop: 4,
            borderRadius: 8,
            borderColor: colors.border,
            borderWidth: 0.5,
            overflow: "hidden",
          }}
        >
          {item.text}
        </Text>
      </View>
    )
  }

  return (
    <Screen
      safeAreaEdges={["bottom"]}
      style={{ backgroundColor: colors.background }}
      statusBarStyle={"dark-content"}
      statusBarColor={colors.primary}
      headerComponent={
        <Header
          title="Bình luận"
          style={{ backgroundColor: colors.primary }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
    >
      <View style={{ height: 0.2, width: "100%", backgroundColor: colors.border }} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        data={comments}
        renderItem={renderCommentItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 8, backgroundColor: colors.background }} />
        )}
      />
      <View
        style={{
          margin: 8,
          backgroundColor: colors.white,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: colors.border,
          flexDirection: "row",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <TextInput
          style={{
            marginHorizontal: 12,
            marginVertical: 8,
            marginBottom: 12,
            flex: 1,
            maxHeight: 120,
            fontSize: 16,
            includeFontPadding: false,
            textAlignVertical: "center",
          }}
          textAlignVertical="center"
          placeholder="Nhập tin nhắn"
          onChangeText={onChangeText}
          value={text}
          numberOfLines={1}
          multiline={true}
        />
        <TouchableOpacity onPress={sendComment}>
          <FontAwesomeIcon
            icon={"paper-plane"}
            size={20}
            style={{
              marginRight: 12,
              marginVertical: 12,
              color: enableSend ? colors.primary : colors.subtitle,
            }}
          />
        </TouchableOpacity>
      </View>
      {loading.getSetting && <ProcessingView isLoading={loading.getSetting} />}
    </Screen>
  )
})
