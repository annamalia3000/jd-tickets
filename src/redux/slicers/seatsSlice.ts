import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Seats = {
  index: number;
  available: boolean;
};

type Coach = {
  _id: string;
  name: string;
  class_type: string;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
  train: string;
};

type CoachWithSeats = {
  coach: Coach;
  seats: Seats[];
};

type SeatsState = CoachWithSeats[];

const initialState: SeatsState = [];

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSeats: (state, action: PayloadAction<CoachWithSeats[]>) => {
      return action.payload;
    },
    clearSeats: () => initialState,
  },
});

export const { setSeats, clearSeats } = seatsSlice.actions;

export default seatsSlice.reducer;
