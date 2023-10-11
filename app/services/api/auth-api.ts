import DeviceInfo from "react-native-device-info"
import { BaseApi } from "./base-api"
import { Platform } from "react-native"
import { ApiResponse } from "apisauce"
import { removeVietnameseAccent } from "../utils/text"

export class AuthApi {
  baseApi = BaseApi.instance()

  async login(params) {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.post(
      "api/TokenAuth/Authenticate",
      params,
    )
    try {
      const authResult = response.data.result
      const error = response.data.error
      if (authResult && authResult.accessToken) {
        this.baseApi.apiInstance.setHeader("Authorization", "Bearer " + authResult.accessToken)
        this.baseApi.apiInstance.setHeader("X-App-Platform", Platform.OS)
        this.baseApi.apiInstance.setHeader("X-App-Channel", DeviceInfo.getApplicationName())
        this.baseApi.apiInstance.setHeader("X-App-BuildNumber", DeviceInfo.getBuildNumber())
        const appDevice = `${await DeviceInfo.getManufacturer()} - ${DeviceInfo.getModel()} - ${(
          await DeviceInfo.getDeviceName()
        ).replace(/[^a-zA-Z0-9 ]/g, "")} - ${Platform.OS} ${DeviceInfo.getSystemVersion()}`
        this.baseApi.apiInstance.setHeader("X-App-Device", removeVietnameseAccent(appDevice))
        this.baseApi.apiInstance.axiosInstance.defaults.headers.Authorization =
          "Bearer " + authResult.accessToken
      }
      return {
        authResult: {
          ...authResult,
          error: error,
        },
      }
    } catch (e) {
      return {
        authResult: {
          error: {
            code: 0,
            message: "errors.unknowError",
            details: "",
            validationErrors: "",
          },
        },
      }
    }
  }
  async sendLoginOTP(params) {
    return await this.baseApi.apiInstance.post("/auth/api/user/otp/login/generate", params)
  }
  async loginOTP(params) {
    return await this.baseApi.apiInstance.post("/auth/api/user/otp/verification", params)
  }
  async senOTPTo(emailOrPhone: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.post(
      "api/services/app/User/forgot-pass/otp?userLogin=" + emailOrPhone,
    )
    try {
      const otpResult = response.data.result
      const error = response.data.error
      return {
        result: otpResult,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }
  async verifyOTP(userId: number, otp: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.post(
      "api/services/app/User/forgot-pass/verify",
      { userId: userId, optNumber: otp },
    )
    try {
      const code = response.data.result
      const error = response.data.error
      return {
        result: code,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }
  async setNewPassword(newPassword: string, passwordResetCode: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.post(
      "api/services/app/User/forgot-pass/reset",
      { newPassword: newPassword, passwordResetCode: passwordResetCode },
    )
    try {
      const code = response.data.result
      const error = response.data.error
      return {
        result: code,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }

  async changePassword(newPassword: string, oldPassword: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.put(
      "/api/services/app/User/ChangePassword",
      { newPassword: newPassword, oldPassword: oldPassword },
    )
    try {
      const code = response.data.result
      const error = response.data.error
      return {
        result: code,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }
}
