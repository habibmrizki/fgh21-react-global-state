import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
};

const tables = createSlice({
  name: "tables",
  initialState,
  reducers: {
    datas: (state, action) => {
      state.forms.push(action.payload);
    },
  },
});

export const { datas } = tables.actions;

export default tables.reducer;
