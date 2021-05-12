import { EDIT_ITEM } from "../constants";

function editItem(array, action) {
  return action;
}

export default function EditTodos(state = {}, action) {
  switch (action.type) {
    case EDIT_ITEM:
      console.log(state);
      return editItem(state, action.data);
    default:
      return state;
  }
}
