import { flow, Instance, types } from "mobx-state-tree"
import { AuthApi } from "../services/api/auth-api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
    refreshTokenValue: types.maybe(types.string),
    user: types.frozen<any>({}),
    profile: types.frozen<any>({}),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.accessToken
    },
  }))
  .actions((store) => {
    const setAccessToken = (value?: string) => {
      store.accessToken = value || undefined
    }
    const setRefreshTokenValue = (value?: string) => {
      store.refreshTokenValue = value || undefined
    }
    const setUser = (value?: any) => {
      store.user = value
    }
    const setProfile = (value?: any) => {
      store.profile = value
    }
    return { setAccessToken, setRefreshTokenValue, setUser, setProfile }
  })
  .actions((store) => ({
      login: flow(function* login(phone: string, password: string): any {
        if (phone.length === 0 || password.length === 0) {
          console.log("Validated: failed!")
        } else {
          const authApi = new AuthApi()
          const response: any = yield authApi.login({
            phone,
            password,
          })
          console.log("API RESPONSE: ", JSON.stringify((response)))
          const {
            data: { data: { roles } },
            status,
          } = response

          if (status === 200) {
            return roles
          }
        }
      }),
      selectUser(user: any) {
        store.setAccessToken(user.token)
        store.setUser(user)
        store.setRefreshTokenValue(user.refreshToken)
        store.setProfile(user.profile)
      },
      logout() {
        store.setAccessToken(undefined)
        store.setRefreshTokenValue(undefined)
        store.setUser(undefined)
        store.setProfile(undefined)
      },
    }),
  )

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {
}