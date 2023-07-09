import { flow, Instance, types } from "mobx-state-tree"
import { AuthApi } from "../services/api/auth-api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
    refreshTokenValue: types.maybe(types.string),
    user: types.frozen<any>({}),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.accessToken
    },
  }))
  .actions((store) => {
    const setAccessToken = (value?: string) => {
      store.accessToken = value
    }
    const setRefreshTokenValue = (value?: string) => {
      store.refreshTokenValue = value
    }
    const setUser = (value?: any) => {
      store.user = value
    }
    return { setAccessToken, setRefreshTokenValue, setUser }
  })
  .actions((store) => ({
      login: flow(function* login(username: string, password: string): any {
        if (username.length === 0 || password.length === 0) {
          console.log("Validated: failed!")
        } else {
          const authApi = new AuthApi()
          const response: any = yield authApi.login({
            phone: username,
            password,
          })
          const {
            data: { user, tokens },
            status,
          } = response

          if (status === 200) {
            store.setRefreshTokenValue(tokens.refresh.token)
            store.setUser(user)
            return { token: tokens, user }
          }
        }
      }),
      logout() {
        store.setAccessToken(undefined)
        store.setRefreshTokenValue(undefined)
        store.setUser(undefined)
      },
    }),
  )

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {
}