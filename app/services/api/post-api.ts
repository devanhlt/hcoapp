import { BaseApi } from "./base-api"

export class PostApi {
  baseApi = BaseApi.instance()

  async addPost(params) {
    return this.baseApi.apiInstance.post("api/posts", params).then((response) => {
      const data = response.data
      if (response.ok) {
        return data
      } else {
        const error = { message: data }
        throw error
      }
    })
  }

  async listPost(params): Promise<any> {
    return this.baseApi.apiInstance.get("api/posts", params)
  }
}
