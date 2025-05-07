import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteProps } from "../../types/types";

type RoutesState = {
  totalCount: number;
  items: RouteProps[];
  fromDate: string;
  toDate: string;
  filters: {
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_first_class: boolean;
    have_wifi: boolean;
    is_express: boolean;
  };
};

const initialState: RoutesState = {
  totalCount: 0,
  items: [],
  fromDate: "",
  toDate: "",
  filters: {
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_first_class: false,
    have_wifi: false,
    is_express: false,
  },
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
    setFromDate: (state, action: PayloadAction<string>) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action: PayloadAction<string>) => {
      state.toDate = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setRoutes, setTotalCount, setFromDate, setToDate, setFilters } =
  routesSlice.actions;
export default routesSlice.reducer;
