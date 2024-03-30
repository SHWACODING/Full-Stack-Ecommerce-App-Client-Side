import { createSlice } from "@reduxjs/toolkit";

interface INetwork {
  isOnline: boolean;
}

const initialState: INetwork = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { networkMode } = networkSlice.actions;
export const selectNetwork = ({ network }: { network: INetwork }) => network;
export default networkSlice.reducer;
