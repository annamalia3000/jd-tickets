import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: 'cash' | 'online';
};

type PersonInfo = {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean; 
  birthday: string; 
  document_type: 'паспорт' | 'свидетельство о рождении';
  document_data: string;
};

type Seat = {
  coach_id: string;
  person_info: PersonInfo;
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
};

type Trip = {
  route_direction_id: string;
  seats: Seat[];
};

type OrderState = {
  user: User | null;
  departure: Trip | null;
  arrival: Trip | null;
};

const initialState: OrderState = {
  user: null,
  departure: null,
  arrival: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setDepartureTrip(state, action: PayloadAction<Trip>) {
      state.departure = action.payload;
    },
    setArrivalTrip(state, action: PayloadAction<Trip>) {
      state.arrival = action.payload;
    },
    clearOrder(state) {
      state.user = null;
      state.departure = null;
      state.arrival = null;
    },
  },
});

export const {
  setUser,
  setDepartureTrip,
  setArrivalTrip,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
