import { createSlice } from '@reduxjs/toolkit';

//-->  initial user object
let UserData = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  investments: [],
};

//-->  create user slice
export const userSlice = createSlice({
  name: 'user',
  initialState: { value: UserData },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
