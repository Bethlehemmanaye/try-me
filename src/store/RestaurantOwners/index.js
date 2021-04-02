import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const RestaurantOwners = new StateArrayModel({
  stateName: "restaurant_owners",
});
RestaurantOwners.setURL("/restaurant_owners");

RestaurantOwners.createSlice();

export const { stateName, reducer } = RestaurantOwners.getEntity();
export const { getLoading } = RestaurantOwners;

RestaurantOwners.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = RestaurantOwners.getSelectors();

export const {
  Add,
  Fetch,
  Edit,
  Patch,
  Remove,
} = RestaurantOwners.getAPIHandles();

export { selectData as selectRestaurantOwnerss };
