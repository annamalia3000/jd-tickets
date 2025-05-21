export type RouteProps = {
  available_seats: number;
  available_seats_info: {
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
  departure: Train;
  arrival?: Train;

  have_air_conditioning: boolean;
  have_first_class: boolean;
  have_fourth_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_wifi: boolean;
  is_express: boolean;
  min_price: number;
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

export type City = {
  _id: string;
  name: string;
};

export type FromTo = {
  city: City;

  datetime: number;
  railway_station_name: string;
};

export type PriceInfo = {
  first: PriceInfoProps;
  second: PriceInfoProps;
  third: PriceInfoProps;
  fourth: PriceInfoProps;
};

export type PriceInfoProps = {
  price: number;
  top_price: number;
  bottom_price: number;
};
