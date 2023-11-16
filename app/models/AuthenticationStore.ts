/* eslint-disable no-throw-literal */
import { flow, Instance, types } from "mobx-state-tree"
import { AuthApi } from "../services/api/auth-api"
import { Alert } from "react-native"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
    refreshTokenValue: types.maybe(types.string),
    userId: types.maybe(types.number),
    passwordResetCode: types.maybe(types.string),
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
    const setUserId = (value?: any) => {
      store.userId = value
    }
    const setPasswordResetCode = (value?: any) => {
      store.passwordResetCode = value
    }
    const setProfile = (value?: any) => {
      store.profile = value
    }
    return {
      setUserId,
      setAccessToken,
      setRefreshTokenValue,
      setUser,
      setProfile,
      setPasswordResetCode,
    }
  })
  .actions((store) => ({
    login: flow(function* login(username: string, password: string): any {
      if (username.length === 0 || password.length === 0) {
        throw { message: "Thiếu thông tin đăng nhập!" }
      } else {
        const authApi = new AuthApi()
        return authApi.login({
          username: username,
          password: password,
        })
      }
    }),
    register: flow(function* register(username: string, password: string): any {
      if (username.length === 0 || password.length === 0) {
        throw { message: "Thiếu thông tin đăng ký!" }
      } else {
        const authApi = new AuthApi()
        return authApi.register({
          username: username,
          password: password,
        })
      }
    }),
    setAuthResult: flow(function* loginOTP({ accessToken, refreshToken, userId }: any): any {
      store.setAccessToken(accessToken)
      store.setRefreshTokenValue(refreshToken)
      store.setUserId(userId)
    }),
    setNewPassword: flow(function* setNewPassword(newPassword: string): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.setNewPassword(newPassword, store.passwordResetCode)
      console.log("API RESPONSE: ", JSON.stringify(response))
      return response
    }),
    changePassword: flow(function* changePassword(
      currentPassword: string,
      newPassword: string,
    ): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.changePassword(newPassword, currentPassword)
      Alert.alert("Đổi mật khẩu thành công", "Vui lòng đăng nhập lại!", [
        {
          text: "Đồng ý",
          onPress: () => {
            store.setAccessToken(undefined)
            store.setRefreshTokenValue(undefined)
            store.setUser(undefined)
            store.setProfile(undefined)
          },
        },
      ])
      return response
    }),
    logout() {
      store.setAccessToken(undefined)
      store.setRefreshTokenValue(undefined)
      store.setUser(undefined)
      store.setProfile(undefined)
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
