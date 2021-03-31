import { constants } from "../reducer";

export const stateName = "current_department";

export const getState = (rootState) => {
  if (rootState[stateName]) {
    return rootState[stateName];
  } else {
    return null;
  }
};

export const setDepartment = (
  _,
  dispatch,
  department = ""
) => {
  dispatch({
    type: constants.UPDATE,
    stateName,
    payload: {
      department
    },
  });
};

export const setPermissions = (
    _,
    dispatch,
    permissions = {}
  ) => {
    dispatch({
      type: constants.UPDATE,
      stateName,
      payload: {
        permissions
      },
    });
  };

export const defaultPermissions = {
  create: true, read: true, update: true, delete: true,
  post: true, send_for_approval: true, approve: true,
  invoice: true, cash_payment: true
}