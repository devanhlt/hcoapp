import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, Text, TextField } from "../../components"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import { get } from "lodash"

interface WarrantyHistoryInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"WarrantyHistoryInfo">> {}

export const WarrantyHistoryInfoScreen: FC<WarrantyHistoryInfoScreenProps> = observer(
  function WarrantyHistoryInfoScreen(props) {
    const {
      route: { params },
    } = props
    const {
      warrantyStore: { histories },
    } = useStores()
    const [hiddenCode, setHiddenCode] = useState("")

    useEffect(() => {
      reload()
    }, [])

    const reload = () => {
      histories({ ...params, limit: 20, hiddenCode })
    }

    const KVListItem = ({ title, value }) => {
      return (
        <View
          style={{
            paddingVertical: spacing.xxs,
            paddingHorizontal: spacing.md,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{title}</Text>
          <Text>{value}</Text>
        </View>
      )
    }

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Lịch sử bảo hành"
            style={{ backgroundColor: colors.palette.appblue }}
            textStyle={{ color: "white" }}
            iconStyle={{ tintColor: "white" }}
          />
        }
        statusBarColor={colors.palette.appblue}
        statusBarStyle="light-content"
        safeAreaEdges={["bottom"]}
      >
        <View style={{ padding: spacing.sm }}>
          <TextField
            value={hiddenCode}
            onChangeText={setHiddenCode}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="phone-pad"
            placeholderTx="activeWarranty.hiddenCodeFieldPlaceholder"
            onSubmitEditing={reload}
            LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
            inputWrapperStyle={$inputWrapperStyle}
            LeftAccessory={() => (
              <View style={{ alignSelf: "center", marginLeft: spacing.sm }}>
                <Icon icon="search" size={24} color={colors.palette.neutral600} />
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            backgroundColor: colors.palette.neutral300,
          }}
        >
          <Text preset="bold" style={{ flex: 2.5 }}>
            Ngày
          </Text>
          <Text preset="bold" style={{ flex: 3 }}>
            Model
          </Text>
          <Text preset="bold" style={{ flex: 4 }}>
            Khách hàng
          </Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.border }} />
          )}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                  }}
                >
                  <Text style={{ flex: 2.5 }}>Ngày</Text>
                  <Text style={{ flex: 3 }}>Model</Text>
                  <Text style={{ flex: 4 }}>Khách hàng</Text>
                </View>
              </View>
            )
          }}
        />
        <View style={{ backgroundColor: colors.palette.white, paddingVertical: spacing.xs }}>
          <KVListItem title={"Số lượng đã kích hoạt"} value={"5"} />
          <View
            style={{
              height: 1,
              backgroundColor: colors.palette.neutral200,
              marginVertical: spacing.xs,
            }}
          />
          <KVListItem title={"Số tiền tương ứng"} value={"200.000đ"} />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $textField: ViewStyle = {}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: 32,
  borderWidth: 1,
  padding: spacing.xxxs,
  borderColor: colors.palette.border,
}
