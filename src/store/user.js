import { createSlice } from "@reduxjs/toolkit"
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload
    },
    logoutSuccess(state, action) {
      state.user = null
    }
  }
});

const { actions, reducer } = userSlice;
export const { loginSuccess, logoutSuccess } = actions;
export default reducer;
