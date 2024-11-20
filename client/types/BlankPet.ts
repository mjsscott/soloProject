import { randomUUID } from "crypto";

// added blank pet for setting state w/types.
export const blankPet = {
    _id: randomUUID(),
    breed: '',
    favorite: false,
    name: "",
    type: "",
    gender: "",
    shelterName: "",
    phone: "",
    email: "",
    age: 0,
    location: {
        lat: 0,
        lng: 0,
    },
    image: "",
    city: '',
    description: '',
    available: true
}