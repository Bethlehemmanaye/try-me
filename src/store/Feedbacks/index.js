import StateArrayModel from "wrappers/StateModels/StateArrayModel";

const Feedback = new StateArrayModel({
  stateName: "feedbacks",
});
Feedback.setURL("/feedbacks");

Feedback.createSlice();

export const { stateName, reducer } = Feedback.getEntity();
export const { getLoading } = Feedback;

Feedback.enableResults({ fetchEnabled: false });

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectPatchStatus,
  selectDeleteStatus,
  selectData,
} = Feedback.getSelectors();

export const { Add, Fetch, Edit, Patch, Remove } = Feedback.getAPIHandles();

export { selectData as selectFeedbacks };
