import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { WarrantyApi } from "../services/api/waranty-api"

/**
 * Model description here for TypeScript hints.
 */
export const WarrantyModel = types
  .model("Warranty")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({
    histories: flow(function* histories(data: any): any {
      const warrantyApi = new WarrantyApi()
      const response = yield warrantyApi.histories(data)
      console.log(response)
    }),
    active: flow(function* active(data: any): any {
      const warrantyApi = new WarrantyApi()
      const response = yield warrantyApi.active(data)
      return response
    }),
  }))

export interface Warranty extends Instance<typeof WarrantyModel> {}
export interface WarrantySnapshotOut extends SnapshotOut<typeof WarrantyModel> {}
export interface WarrantySnapshotIn extends SnapshotIn<typeof WarrantyModel> {}
export const createWarrantyDefaultModel = () => types.optional(WarrantyModel, {})
