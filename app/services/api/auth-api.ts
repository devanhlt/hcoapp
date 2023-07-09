import { BaseApi } from "./base-api"

export class AuthApi {
  baseApi = BaseApi.instance()

  async login(params) {
    return await this.baseApi.apiInstance.post("/auth/login", params)
  }
}
