import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { PostApi } from "../services/api/post-api"

/**
 * Model description here for TypeScript hints.
 */
export const PostsModel = types
  .model("Posts")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    listPost: flow(function* listPost() {
      const postApi = new PostApi()
      return postApi.listPost({})
    }),
    listComment: flow(function* listComment(params) {
      const postApi = new PostApi()
      return postApi.listComment(params)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Posts extends Instance<typeof PostsModel> {}
export interface PostsSnapshotOut extends SnapshotOut<typeof PostsModel> {}
export interface PostsSnapshotIn extends SnapshotIn<typeof PostsModel> {}
export const createPostsDefaultModel = () => types.optional(PostsModel, {})
