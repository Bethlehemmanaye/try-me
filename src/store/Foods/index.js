import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Food = new StateArrayModel({
  stateName: "foods"
});
Food.setURL("/foods");

Food.createSlice();

export const { stateName, reducer } = Food.getEntity();
export const { getLoading } = Food;

Food.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData
} = Food.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Food.getAPIHandles();

export { selectData as selectFoods };
