// Import necessary functions and slices from Redux Toolkit
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { UserDataReduce } from "./userdata";

// Define the initial state for the loader slice
let loader = false;

// Create the loader slice using createSlice
export const loaderReduce = createSlice({
  // Give the slice a name
  name: "loader",
  // Set the initial state for the slice
  initialState: loader,
  // Define reducer functions for the slice
  reducers: {
    // Define the changeLoaderHandler reducer
    changeLoaderHandler(state, action) {
      // Toggle the value of the loader state
      return !state;
    },
  },
});

// Create the Redux store and configure it with the loader, menu, and UserData reducers
const store = configureStore({
  reducer: {
    loader: loaderReduce.reducer,
    UserData: UserDataReduce.reducer,
  },
  // Disable serializableCheck middleware to avoid errors with non-serializable data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the changeLoaderHandler function from the loader slice's actions
export const { changeLoaderHandler } = loaderReduce.actions;

// Export the configured Redux store as the default export
export default store;
