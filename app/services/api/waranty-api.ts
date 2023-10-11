import { BaseApi } from "./base-api"

export class WarrantyApi {
  baseApi = BaseApi.instance()

  async active(data: any): Promise<any> {
    const response = await this.baseApi.apiInstance.post<any>(
      "/api/services/app/WarrantyActivation/activate",
      data,
    )

    try {
      const result = response.data.result
      const error = response.data.error
      return {
        result,
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

  async histories(data): Promise<any> {
    const response = await this.baseApi.apiInstance.get<any>(
      "/api/services/app/WarrantyActivation/histories",
      data,
    )

    try {
      const result = response.data.result
      const error = response.data.error
      return {
        result,
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

  async detail(): Promise<any> {
    const response = await this.baseApi.apiInstance.get<any>(
      "/api/services/app/WarrantyActivation/detail",
    )

    try {
      const result = response.data.result
      const error = response.data.error
      return {
        result,
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
