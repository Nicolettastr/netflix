import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  user: null,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
    },

    handleLogout: (state) => {
      state.user = null;
    },

  },
});

export const { handleLogin, handleLogout } = userSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// selectUser goes into the state, where it goes to the user state.user makes reference to the name: 'user' in the state and finally gets the user which is in the initialState as user: null
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;