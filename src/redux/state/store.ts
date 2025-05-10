import { combineReducers, configureStore } from "@reduxjs/toolkit";
import routesReducer from "../slicers/routesSlice";
import seatsReducer from "../slicers/seatsSlice";
import selectedTicketSlice from "../slicers/selectedTicketSlice";


const rootReducer = combineReducers({
  routes: routesReducer,
  seats: seatsReducer,
  selectedTicket: selectedTicketSlice

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
