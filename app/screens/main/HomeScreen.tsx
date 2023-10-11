import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { AppStackScreenProps, navNext } from "../../navigators"
import { useStores } from "../../models"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native-gesture-handler"
import ProcessingView from "../../components/ProcessingView"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const {
    appStore: { getSetting },
    loadingStore: { loading },
  } = useStores()
  const { navigate } = useNavigation()

  useEffect(() => {
    getSetting()
  }, [])

  const openProfile = () => {
    navNext("ProfileInformation")
  }

  return (
    <Screen
      style={{ backgroundColor: colors.palette.neutral100 }}
      statusBarStyle={"dark-content"}
      statusBarColor={"white"}
      safeAreaEdges={["bottom"]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: spacing.xxxs }}
        ListHeaderComponent={() => (
          <View>
            <View style={$topContainer}>
              <View>
                <Text
                  testID="welcome-heading"
                  style={[$welcomeHeading, { fontSize: 16, fontWeight: "bold" }]}
                  text="KH001 - KHÁCH HÀNG 001"
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  borderWidth: 3,
                  borderColor: colors.palette.appblue,
                }}
                onPress={openProfile}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/ab/ba/70/abba702dbba627fc3e7c05213b3f2ce6.jpg",
                  }}
                  style={{ flex: 1, alignSelf: "stretch", borderRadius: 64, margin: 2 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={{ marginTop: spacing.xs, paddingHorizontal: spacing.sm }}
        data={[
          {
            name: "Quay số\nmay mắn",
            code: "LUCKYDRAW",
            picture: "https://vouchermatic.app/wp-content/uploads/2019/11/Events.png",
            color: "#EEDD2244",
          },
          {
            name: "Kích hoạt\nbảo hành",
            code: "WARRANTY",
            picture:
              "https://static.vecteezy.com/system/resources/previews/011/654/819/original/transparent-warranty-icon-free-png.png",
            color: "#0000000A",
          },
          {
            name: "Lịch sử\nkích hoạt",
            code: "WARRANTY_INFO",
            picture: "https://cdn-icons-png.flaticon.com/512/1809/1809147.png",
            color: "#0000000A",
          },
          {
            name: "Thông tin\nhỗ trợ",
            code: "SUPPORT_INFORMATION",
            picture: "https://cdn-icons-png.flaticon.com/512/4230/4230745.png",
            color: "#1166AA22",
          },
          {
            name: "Tin tức",
            code: "NEWS",
            picture:
              "https://icons-for-free.com/iconfiles/png/512/morning+news+newspaper+icon-1320136429130706490.png",
            color: "#1155BB22",
          },
          {
            name: "Lịch sử\nbảo hành",
            code: "WARRANTY_HISTORY",
            picture: "https://cdn-icons-png.flaticon.com/512/1809/1809147.png",
            color: "#0000000A",
          },
        ]}
        renderItem={({ item }) => {
          function handleMenuPressed() {
            switch (item.code) {
              case "LUCKYDRAW":
                navNext("LuckyDraw")
                break
              case "WARRANTY":
                navNext("ActiveWarranty")
                break
              case "WARRANTY_INFO":
                navNext("WarrantyInfoDateRange")
                break
              case "SUPPORT_INFORMATION":
                navNext("SupportInformation")
                break
              case "NEWS":
                navNext("News")
                break
              case "WARRANTY_HISTORY":
                navNext("WarrantyList")
                break
            }
          }

          return (
            <TouchableOpacity
              style={{
                maxWidth: "33%",
                width: "33%",
                alignItems: "center",
              }}
              onPress={handleMenuPressed}
            >
              <View
                style={{
                  backgroundColor: item.color,
                  width: "70%",
                  aspectRatio: 1,
                  borderRadius: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: spacing.md,
                }}
              >
                <Image source={{ uri: item.picture }} style={{ flex: 1, alignSelf: "stretch" }} />
              </View>
              <Text
                style={{
                  color: "black",
                  paddingHorizontal: spacing.xs,
                  paddingVertical: spacing.xxs,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 16,
                  marginTop: 4,
                }}
                preset="formLabel"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
        ItemSeparatorComponent={() => <View style={{ width: 16, height: 16 }} />}
        numColumns={3}
      />
      {loading.getSetting && <ProcessingView isLoading={loading.getSetting} />}
    </Screen>
  )
})

const $topContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $welcomeHeading: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.xxs,
}
