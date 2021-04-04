import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Restaurant = new StateArrayModel({
  stateName: "restaurants"
});
Restaurant.setURL("/restaurants");

Restaurant.createSlice();

export const { stateName, reducer } = Restaurant.getEntity();
export const { getLoading } = Restaurant;

Restaurant.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData
} = Restaurant.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Restaurant.getAPIHandles();

export { selectData as selectRestaurants };
