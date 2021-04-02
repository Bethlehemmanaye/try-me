import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Users = new StateArrayModel({
  stateName: "users",
});
Users.setURL("/users");

Users.createSlice();

export const { stateName, reducer } = Users.getEntity();
export const { getLoading } = Users;

Users.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Users.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Users.getAPIHandles();

export { selectData as selectUserss };
