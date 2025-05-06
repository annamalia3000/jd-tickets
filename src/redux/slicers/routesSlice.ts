import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteProps } from "../../types/types";

type RoutesState = {
  totalCount: number;
  items: RouteProps[];
};

const initialState: RoutesState = {
  totalCount: 0,
  items: [],
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<RouteProps[]>) => {
      state.items = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setRoutes, setTotalCount } = routesSlice.actions;
export default routesSlice.reducer;
