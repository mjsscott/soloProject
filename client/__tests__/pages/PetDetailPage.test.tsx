import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PetDetailPage from '../../src/pages/PetDetailPage';  // Adjusted import
import { Pet } from '../../types/Pet';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

        mockedAxios.get.mockRejectedValue('Error fetching your pet details:');
        mockedAxios.get.mockResolvedValue({ data: mockPet });
        render(< MemoryRouter>
            <PetDetailPage pet={mockPet} />
        </MemoryRouter>);


       await waitFor(()=>{

           expect(screen.getByTestId('petname').textContent).toBe(mockPet.name);
           expect(screen.getByTestId('petage').textContent).toBe(`Age: ${mockPet.age}`);
           expect(screen.getByTestId('petphone').textContent).toBe(mockPet.phone);
           expect(axios.get).toHaveBeenCalledTimes(1);


       })
    });
});


