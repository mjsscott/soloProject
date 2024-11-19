import { IUser } from "../models/user";

export interface PetType  {
_id: string;
name: string;
type: string;
favorite: boolean;
breed: string;
age: number;
gender: string;
location: {
    lat: number;
    lng: number;

};
city: string;
description: string;
image: string;
available: boolean;
shelterName: string;
phone: string;
email: string;
  }

export interface FavoriteRequest extends Request {
  params: {
    id: string;  // The petId in this case, assuming it will be a string
  };
  user?: IUser
}