import { render, renderHook, screen } from '@testing-library/react';
import PetCard from '../../src/components/PetCard';
import { PetCardProps } from '../../types/Components.js';
import { MemoryRouter } from 'react-router-dom';

const mockPet = {
    _id: '1234',
    name: 'Ginger',
    type: 'Cat',
    age: 3,
    location: { lat: 53.8008, lng: -1.5491 },
    city: 'Leeds',
    shelterName: 'Shelter',
    phone: '123456789',
    email: 'shelter@gamil.com',
    image: '/images/ginger.jpg',
    gender: 'Female',
    favorite: false,
    breed: 'English longhair',
    description: 'she is so sweet!',
    available: true,
};

describe('PetCard', () => {
    it('renders pet information correctly', () => {
        render(
            <MemoryRouter>
                <PetCard pet={mockPet} />
            </MemoryRouter>
        );
        expect(screen.getByText(mockPet.name).textContent).toBe('Ginger')


})})
