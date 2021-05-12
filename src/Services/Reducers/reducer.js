import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../constants";

const initialState = {
  item: [],
  selectedData: {},
};

function deletedItemList(array, action) {
  return array.filter((item) => item.id !== action.id);
}

export default function Todos(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return { item: [...state.item, action.data] };
      break;
    case DELETE_ITEM:
      return { item: deletedItemList(state.item, action.data) };
      break;
    case UPDATE_ITEM:
      return { selectedData: action };
    default:
      return state;
  }
}
