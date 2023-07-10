/* eslint-disable import/first */
import { BaseApi } from "./services/api/base-api"
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { useInitialRootStore } from "./models"
import { AppNavigator } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import { customFontsToLoad } from "./theme"
import { configOf } from "./config"

if (__DEV__) {
  require("./devtools/ReactotronConfig.ts")
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated, rootStore } = useInitialRootStore(() => {
    BaseApi.instance(rootStore)
    setTimeout(hideSplashScreen, 500)
  })

  if (!rehydrated || !areFontsLoaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={configOf(rootStore.environmentStore.currentEnv).catchErrors}>
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
