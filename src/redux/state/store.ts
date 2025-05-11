import { combineReducers, configureStore } from "@reduxjs/toolkit";
import routesReducer from "../slicers/routesSlice";
import seatsReducer from "../slicers/seatsSlice";
import selectedReducer from "../slicers/selectedTicketSlice";
import orderReducer from "../slicers/orderSlice";


const rootReducer = combineReducers({
  routes: routesReducer,
  seats: seatsReducer,
  selectedTicket: selectedReducer,
  order:  orderReducer

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
