import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
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
      style={{ backgroundColor: colors.palette.white }}
      statusBarStyle={"dark-content"}
      statusBarColor={"white"}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ flex: 1 }}
        ListHeaderComponent={() => (
          <View>
            <View style={$topContainer}>
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
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={$heading} text="KH001" />
                <Text style={$heading} text="KHÁCH HÀNG 001" />
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.palette.dividerGrey,
                marginTop: 8,
                marginBottom: 24,
              }}
            />
          </View>
        )}
        style={{ marginTop: spacing.xs, paddingHorizontal: spacing.sm }}
        data={[
          {
            name: "Xe vào",
            code: "DRIVE_IN",
            icon: "drive_in",
            color: colors.palette.appblue,
          },
          {
            name: "Xe ra",
            code: "DRIVE_OUT",
            icon: "drive_out",
            color: colors.palette.red,
          },
          {
            name: "Báo cáo",
            code: "REPORT",
            icon: "report",
            color: colors.palette.black,
          },
        ]}
        renderItem={({ item }) => {
          function handleMenuPressed() {
            switch (item.code) {
              case "DRIVE_IN":
                navNext("DriveIn")
                break
              case "DRIVE_OUT":
                navNext("DriveOut")
                break
              case "REPORT":
                navNext("Report")
                break
            }
          }

          return (
            <TouchableOpacity
              style={{
                maxWidth: "40%",
                width: "40%",
                alignItems: "center",
                marginHorizontal: "5%",
                marginVertical: 12,
                padding: 16,
                backgroundColor: item.color,
                borderRadius: 12,
                elevation: 4,
              }}
              onPress={handleMenuPressed}
            >
              <Icon
                icon={item.icon}
                size={64}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  tintColor: "white",
                }}
              />
              <Text
                style={{
                  color: colors.palette.white,
                  paddingHorizontal: spacing.xs,
                  paddingVertical: spacing.xxs,
                  fontSize: 20,
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
        numColumns={2}
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

const $heading: TextStyle = { fontSize: 16, fontWeight: "bold" }
