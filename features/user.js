import { createSlice } from '@reduxjs/toolkit';

//-->  initial user object
const UserData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

//-->  create user slice
export const userSlice = createSlice({
  name: 'User',
  initialState: { value: UserData },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
