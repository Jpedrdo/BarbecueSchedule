import { Dayjs } from "dayjs";

export interface ILogin {
  email: { value: string };
  password: { value: string };
}

export interface Participants {
  id: number;
  name: string;
  paid: boolean;
  personPrice: number;
}

export interface DialogValues {
  id: number;
  title: string;
  date: Dayjs |  null;
  participants: Participants[];
  currentName?: string;
  currentPrice?: string;
}

export interface CardData {
  id?: number;
  date: string;
  title: string;
  members: number;
  price: number;
  participants: Participants[];
}

export interface Barbecue {
  cardList: CardData[];
}
