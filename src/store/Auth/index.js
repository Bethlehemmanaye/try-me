import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Auth = new StateArrayModel({
  stateName: "auth"
});
Auth.setURL("/auth");

Auth.createSlice();

export const { stateName, reducer } = Auth.getEntity();
export const { getLoading } = Auth;

Auth.enableResults({ fetchEnabled: false });

export const { selectAddStatus } = Auth.getSelectors();

export const { Add } = Auth.getAPIHandles();
