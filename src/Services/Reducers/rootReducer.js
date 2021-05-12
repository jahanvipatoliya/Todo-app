import Todos from "./reducer";
import EditTodos from "./editTodods";
import { combineReducers } from "redux";

export default combineReducers({
  Todos,
  EditTodos,
});
