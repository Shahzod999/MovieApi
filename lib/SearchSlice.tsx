import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "batman",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice.reducer;
