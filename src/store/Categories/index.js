import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Category = new StateArrayModel({
  stateName: "categories"
});
Category.setURL("/categories");

Category.createSlice();

export const { stateName, reducer } = Category.getEntity();
export const { getLoading } = Category;

Category.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData
} = Category.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Category.getAPIHandles();

export { selectData as selectCategories };
