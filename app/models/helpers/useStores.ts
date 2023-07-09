import { createContext, useContext, useEffect, useState } from "react"
import { RootStore, RootStoreModel } from "../RootStore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import persist from "mst-persist"

const _rootStore = RootStoreModel.create({})

const RootStoreContext = createContext<RootStore>(_rootStore)

export const useStores = () => useContext(RootStoreContext)

export const useInitialRootStore = (callback: () => void | Promise<void>) => {
  const rootStore = useStores()
  const [rehydrated, setRehydrated] = useState(false)

  // Kick off initial async loading actions, like loading fonts and rehydrating RootStore
  useEffect(() => {
    ;(async () => {
      if (__DEV__) {
        console.tron.trackMstNode(rootStore)
      }

      // persist and rehydrated store
      await persist("root-v1", rootStore, {
        storage: AsyncStorage,
        jsonify: true,
        whitelist: ["environmentStore", "authenticationStore"],
      })

      // let the app know we've finished rehydrating
      setRehydrated(true)

      // invoke the callback, if provided
      if (callback) callback()
    })()
  }, [])

  return { rootStore, rehydrated }
}
