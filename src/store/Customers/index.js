import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Customer = new StateArrayModel({
  stateName: "customer",
});
Customer.setURL("/customer");

Customer.createSlice();

export const { stateName, reducer } = Customer.getEntity();
export const { getLoading } = Customer;

Customer.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Customer.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Customer.getAPIHandles();

export { selectData as selectCustomers };
