import { combineReducers } from "@reduxjs/toolkit";
import tables from "./tables";
// import counter from './counter';
// import survey from './survey';
// import todolist from './todolist';

const reducer = combineReducers({
  //   survey,
  //   todolist,
  tables,
});

export default reducer;
