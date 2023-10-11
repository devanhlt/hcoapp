import { flow, getRoot, Instance, types } from "mobx-state-tree"
import { AuthApi } from "../services/api/auth-api"
import { getUniqueId } from "react-native-device-info"
import { delay } from "../utils/delay"
import { RootStore } from "./RootStore"
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
    login: flow(function* login(userName: string, password: string): any {
      if (userName.length === 0 || password.length === 0) {
        console.log("Validated: failed!")
      } else {
        const authApi = new AuthApi()
        const { authResult }: any = yield authApi.login({
          userNameOrEmailAddress: userName,
          password: password,
          rememberClient: true,
        })
        return authResult
      }
    }),
    setAuthResult: flow(function* loginOTP({ accessToken, refreshToken, userId }: any): any {
      store.setAccessToken(accessToken)
      store.setRefreshTokenValue(refreshToken)
      store.setUserId(userId)
    }),
    sendOTP: flow(function* sendOTP(emailOrPhone: string): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.senOTPTo(emailOrPhone)
      store.setUserId(response.result.id)
      console.log("API RESPONSE: ", store.userId)
      return response
    }),
    verifyOTP: flow(function* verifyOTP(otp: string): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.verifyOTP(store.userId, otp)
      console.log("API RESPONSE: ", JSON.stringify(response))
      store.setPasswordResetCode(response.result)
      return response
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
    sendLoginOTP: flow(function* sentLoginOTP(phone: string): any {
      if (phone.length === 0) {
        console.log("Validated: failed!")
      } else {
        const authApi = new AuthApi()
        const response: any = yield authApi.sendLoginOTP({ phone })
        console.log("API RESPONSE: ", JSON.stringify(response))
        return response
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
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
