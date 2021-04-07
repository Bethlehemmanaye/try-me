import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const User = new StateArrayModel({
  stateName: "users"
});
User.setURL("/users");

User.createSlice();

export const { stateName, reducer } = User.getEntity();
export const { getLoading } = User;

User.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData
} = User.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = User.getAPIHandles();

export { selectData as selectUsers };
