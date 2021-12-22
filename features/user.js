import { createSlice } from '@reduxjs/toolkit';

//-->  initial user object
let UserData = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  investments: [],
  inv_prc: 0,
  position: 0,
};

//-->  create user slice
export const userSlice = createSlice({
  name: 'user',
  initialState: { value: UserData },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    set_investment: (state, action) => {
      state.value.investments = action.payload;
    },
    set_inv_amt: (state, action) => {
      state.value.inv_prc = action.payload;
    },
    set_pos: (state, action) => {
      state.value.position = action.payload;
    },
  },
});

export const { login, set_investment, set_inv_amt, set_pos } =
  userSlice.actions;

export default userSlice.reducer;
