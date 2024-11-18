import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PetDetailPage from '../../src/pages/PetDetailPage';  // Adjusted import
import { useParams } from 'react-router-dom';
import { PetDetailPageProps } from '../../types/Components';
import { Pet } from '../../types/Pet';



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),  // Keep the actual module's functionality
    useParams: jest.fn(),  // Mock `useParams` here
}));
jest.mock('axios', () => ({
    get: jest.fn(), // Mock `axios.get` here
}));

const mockPet: Pet = {
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

describe('PetDetailPage', () => {
    it('fetches and displays the details of the selected pet', async () => {
        render(<PetDetailPage pet={mockPet} />);
        expect(screen.getByTestId('name')).toEqual('Ginger');
    });
});

