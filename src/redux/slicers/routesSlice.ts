import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteProps } from "../../types/types";

type DirectionParams = {
  fromCity: string;
  toCity: string;
  fromDate: string;
  toDate: string;
};

type Filters = {
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_first_class: boolean;
  have_wifi: boolean;
  is_express: boolean;
  minPrice: number;
  maxPrice: number;
  from: {
    minTimeDepature: number;
    maxTimeDepature: number;
    minTimeArrival: number;
    maxTimeArrival: number;
  };
  to: {
    minTimeDepature: number;
    maxTimeDepature: number;
    minTimeArrival: number;
    maxTimeArrival: number;
  };
};

type RoutesState = {
  forwardDirection: DirectionParams;
  backwardDirection: DirectionParams;

  forwardRoutes: RouteProps[];
  backwardRoutes: RouteProps[];

  totalCount: number;
  fromDate: string;
  toDate: string;
  filters: Filters;
  priceRange: [number, number];
};

const initialState: RoutesState = {
  forwardDirection: {
    fromCity: "",
    toCity: "",
    fromDate: "",
    toDate: "",
  },
  backwardDirection: {
    fromCity: "",
    toCity: "",
    fromDate: "",
    toDate: "",
  },

  forwardRoutes: [],
  backwardRoutes: [],

  totalCount: 0,
  fromDate: "",
  toDate: "",
  filters: {
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_first_class: false,
    have_wifi: false,
    is_express: false,
    minPrice: 0,
    maxPrice: Infinity,
    from: {
      minTimeDepature: 0,
      maxTimeDepature: 1440,
      minTimeArrival: 0,
      maxTimeArrival: 1440,
    },
    to: {
      minTimeDepature: 0,
      maxTimeDepature: 1440,
      minTimeArrival: 0,
      maxTimeArrival: 1440,
    },
  },
  priceRange: [0, Infinity],
};
const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setForwardDirection: (state, action: PayloadAction<DirectionParams>) => {
      state.forwardDirection = action.payload;
    },
    setBackwardDirection: (state, action: PayloadAction<DirectionParams>) => {
      state.backwardDirection = action.payload;
    },
    setForwardRoutes: (state, action: PayloadAction<RouteProps[]>) => {
      state.forwardRoutes = action.payload;
    },
    setBackwardRoutes: (state, action: PayloadAction<RouteProps[]>) => {
      state.backwardRoutes = action.payload;
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
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
  },
});

export const {
  setForwardDirection,
  setBackwardDirection,
  setForwardRoutes,
  setBackwardRoutes,
  setTotalCount,
  setFromDate,
  setToDate,
  setFilters,
  setPriceRange,
} = routesSlice.actions;

export default routesSlice.reducer;
