import { Pet } from "./Pet";
export interface PetCardProps {
    pet: Pet;
}
export interface MapProps {
    pets: Pet[];
}
export interface PetDetailPageProps {
    pet: Pet;
}
export interface MapComponentProps {
    pets: Pet[]; // The component receives an array of Pet objects
}
export interface FavsPetPageProps {
    favorites: Pet[];
}