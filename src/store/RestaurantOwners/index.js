import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const RestaurantOwner = new StateArrayModel({
  stateName: "restaurant_owners",
});
RestaurantOwner.setURL("/restaurant_owners");

RestaurantOwner.createSlice();

export const { stateName, reducer } = RestaurantOwner.getEntity();
export const { getLoading } = RestaurantOwner;

RestaurantOwner.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = RestaurantOwner.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = RestaurantOwner.getAPIHandles();

export { selectData as selectRestaurantOwners };
