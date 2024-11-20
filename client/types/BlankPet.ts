import { nanoid } from "nanoid"

const id = nanoid(24);

// added blank pet for setting state w/types.
export const blankPet = {
    _id: id,
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