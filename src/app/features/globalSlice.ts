import { createSlice } from "@reduxjs/toolkit";

interface ICartDrawer {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

const initialState: ICartDrawer = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { onOpenCartDrawerAction, onCloseCartDrawerAction } =
  globalSlice.actions;
export const selectGlobal = ({ global }: { global: ICartDrawer }) => global;
export default globalSlice.reducer;
