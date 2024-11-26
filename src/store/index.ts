import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./pizzaSlice";

export const store = configureStore({
  reducer: {
    pizzaCart: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
