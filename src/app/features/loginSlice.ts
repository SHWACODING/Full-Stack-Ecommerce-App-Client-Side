import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";
import { IActions } from "../../interfaces/interface";

const { toast } = createStandaloneToast();

interface IloginSlice {
  loading: boolean;
  data: string[] | null;
  error: string | null | undefined;
}

interface IUser {
  identifier: string;
  password: string;
}

const initialState: IloginSlice = {
  loading: false, // ** Pending
  data: null, // ** Success == Fulfiled
  error: null, // ** Error == Rejected
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: IUser, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSclice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<IActions>) => {
          state.loading = false;
          state.data = action.payload.data as string[];
          state.error = null;
          const date = new Date();
          const IN_HOURS = 1000 * 60 * 60 * 24;
          const IN_DAYS = 3;
          const EXPIRES_IN_DAYS = IN_HOURS * IN_DAYS;
          date.setTime(date.getTime() + EXPIRES_IN_DAYS);
          const options = { path: "/", expires: date };
          CookieService.set("jwt", action.payload.jwt, options);
          toast({
            title: "Loged In Successfully",
            description: "Valid User Authentication",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
        toast({
          title: "Invalid Identifier Or Password",
          description: "Make Sure You Have The Correct Email Or Password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  },
});

export const selectLogin = ({ login }: { login: IloginSlice }) => login;
export default loginSclice.reducer;

// const loginSclice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {},
//   extraReducers (userLogin: ActionReducerMapBuilder<IloginSlice>): {
//     [userLogin.pending]: (state) => {
//       state.loading = true;
//     },
//     [userLogin.fulfilled]: (state: IloginSlice, action: PayloadAction<IloginSlice>) => {
//       state.loading = false;
//       state.data = action.payload;
//       state.error = null;
//     },
//     [userLogin.rejected]: (state: IloginSlice, action: PayloadAction<IloginSlice>) => {
//       state.loading = false;
//       state.data = [];
//       state.error = action.payload;
//     },
//   },
// });
