import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedTicketState = {
  available_seats: number;
  available_seats_info: {
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
  departure: Train;
  arrival: Train;

  have_air_conditioning: boolean;
  have_first_class: boolean;
  have_fourth_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_wifi: boolean;
  is_express: boolean;
  min_price: number;
  adults?: number;
  kids?: number;
  kidsNoSeat?: number;
  totalPrice? : number;
};

export type Train = {
  _id: string;
  available_seats_info: {
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number;

  from: FromTo;
  to: FromTo;
  train: {
    name: string;
    _id: string;
  };
  price_info: PriceInfo;
};

type City = {
  _id: string;
  name: string;
};

type FromTo = {
  city: City;
  datetime: number;
  railway_station_name: string;
};

type PriceInfo = {
  first: PriceInfoProps;
  second: PriceInfoProps;
  third: PriceInfoProps;
  fourth: PriceInfoProps;
};

type PriceInfoProps = {
  price: number;
  top_price: number;
  bottom_price: number;
};

const emptyTrain: Train = {
  _id: "",
  available_seats_info: {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  },
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_air_conditioning: false,
  is_express: false,
  min_price: 0,
  duration: 0,
  from: {
    city: {
      _id: "",
      name: "",
    },
    datetime: 0,
    railway_station_name: "",
  },
  to: {
    city: {
      _id: "",
      name: "",
    },
    datetime: 0,
    railway_station_name: "",
  },
  train: {
    name: "",
    _id: "",
  },
  price_info: {
    first: { price: 0, top_price: 0, bottom_price: 0 },
    second: { price: 0, top_price: 0, bottom_price: 0 },
    third: { price: 0, top_price: 0, bottom_price: 0 },
    fourth: { price: 0, top_price: 0, bottom_price: 0 },
  },
};

const initialState: SelectedTicketState = {
  available_seats: 0,
  available_seats_info: {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  },
  departure: emptyTrain,
  arrival: emptyTrain,
  have_air_conditioning: false,
  have_first_class: false,
  have_fourth_class: false,
  have_second_class: false,
  have_third_class: false,
  have_wifi: false,
  is_express: false,
  min_price: 0,
  adults: 0,
  kids: 0,
  kidsNoSeat: 0,
  totalPrice: 0,
};

const selectedTicketSlice = createSlice({
  name: "selectedTicket",
  initialState: initialState,
  reducers: {
    setSelectedTicket: (_state, action: PayloadAction<SelectedTicketState>) => {
      return action.payload;
    },
    clearSelectedTicket: () => initialState,
    setAdultsNumberTicket: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setKidsNumberTicket: (state, action: PayloadAction<number>) => {
      state.kids = action.payload;
    },
    setKidsNoSeatNumberTicket: (state, action: PayloadAction<number>) => {
      state.kidsNoSeat = action.payload;
    },
     setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  setSelectedTicket,
  clearSelectedTicket,
  setAdultsNumberTicket,
  setKidsNumberTicket,
  setKidsNoSeatNumberTicket,
  setTotalPrice
} = selectedTicketSlice.actions;
export default selectedTicketSlice.reducer;
