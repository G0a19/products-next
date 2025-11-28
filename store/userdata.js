import { createSlice } from "@reduxjs/toolkit"; // Import the createSlice function from the Redux Toolkit

let UserData = ""; // Define the initial state for the UserData slice

// Create the UserData slice using createSlice
export const UserDataReduce = createSlice({
  // Give the slice a name
  name: "UserData",
  // Set the initial state for the slice
  initialState: UserData,
  // Define reducer functions for the slice
  reducers: {
    // Define the setUserDataHandler reducer
    setUserDataHandler(state, action) {
      // Update the UserData variable with the new value
      UserData = action.payload.UserData;
      // Return the new value to become the new state of the slice
      return action.payload.UserData;
    },
  },
});

// Export the setUserDataHandler function from the slice's actions
export const { setUserDataHandler } = UserDataReduce.actions;
