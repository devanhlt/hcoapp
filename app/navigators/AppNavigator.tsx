import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "../screens"
import { navigationRef } from "./navigationUtilities"
import { colors } from "../theme"
import { useStores } from "../models"
import { WarrantyListScreen } from "../screens/warranty/list-screen"
import { WarrantyDetailScreen } from "../screens/warranty/detail-screen"
import { ProductDetailScreen } from "../screens/warranty/product-detail-screen"
import { WarrantyTimesScreen } from "../screens/warranty/times-screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "../components"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export type AppStackParamList = {
  Login: undefined
  HomeTab: undefined
  Home: undefined
  DriveIn: undefined
  DriveOut: undefined

  SelectRole: undefined
  SendOtp: undefined
  VerifyOtp: undefined
  Register: undefined
  ResetPassword: undefined
  ChangePassword: undefined
  ProfileInformation: undefined
  News: undefined
  SupportInformation: undefined
  WarrantyHistoryInfo: undefined
  ActiveWarranty: undefined
  LuckyDraw: undefined
  WarrantyInfoDateRange: undefined
  WarrantyList: undefined
  WarrantyDetail: undefined
  WarrantyProductDetail: undefined
  WarrantyTime: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  const Tab = createBottomTabNavigator()

  function HomeTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            marginBottom: 8,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name) {
              case "Home":
                iconName = focused ? "bell" : "bell"
                break
              case "DriveIn":
                iconName = focused ? "search" : "search"
                break
              case "DriveOut":
                iconName = focused ? "call" : "call"
                break
              default:
                iconName = "pin"
                break
            }
            return <Icon icon={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.palette.appblue,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen options={{ title: "Trang chủ" }} name="Home" component={Screens.HomeScreen} />
        <Tab.Screen
          options={{ title: "Xe vào" }}
          name="DriveIn"
          component={Screens.ProfileInformationScreen}
        />
        <Stack.Screen options={{ title: "Xe ra" }} name="DriveOut" component={Screens.NewsScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "HomeTab" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeTabScreen} />
          <Stack.Screen name="ChangePassword" component={Screens.ChangePasswordScreen} />
          <Stack.Screen name="SupportInformation" component={Screens.SupportInformationScreen} />
          <Stack.Screen name="WarrantyHistoryInfo" component={Screens.WarrantyHistoryInfoScreen} />
          <Stack.Screen name="ActiveWarranty" component={Screens.ActiveWarrantyScreen} />
          <Stack.Screen name="LuckyDraw" component={Screens.LuckyDrawScreen} />
          <Stack.Screen name="WarrantyList" component={WarrantyListScreen} />
          <Stack.Screen name="WarrantyDetail" component={WarrantyDetailScreen} />
          <Stack.Screen name="WarrantyProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="WarrantyTime" component={WarrantyTimesScreen} />
          <Stack.Screen
            name="WarrantyInfoDateRange"
            component={Screens.WarrantyInfoDateRangeScreen}
          />
          {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="SendOtp" component={Screens.SendOtpScreen} />
          <Stack.Screen name="VerifyOtp" component={Screens.VerifyOtpScreen} />
          <Stack.Screen name="SelectRole" component={Screens.SelectRoleScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
