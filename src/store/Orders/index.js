import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Order = new StateArrayModel({
  stateName: "orders"
});
Order.setURL("/orders");

Order.createSlice();

export const { stateName, reducer } = Order.getEntity();
export const { getLoading } = Order;

Order.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData
} = Order.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Order.getAPIHandles();

export { selectData as selectOrders };
