import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, UPDATE_ITEM } from "../constants";

export const addtoTable = (data) => {
  return {
    type: ADD_ITEM,
    data: data,
  };
};

export const deleteItem = (data) => {
  return {
    type: DELETE_ITEM,
    data: data,
  };
};

export const editItem = (data) => {
  return {
    type: EDIT_ITEM,
    data: data,
  };
};

export const updateItem = (data) => {
  return {
    type: UPDATE_ITEM,
    data: data,
  };
};
