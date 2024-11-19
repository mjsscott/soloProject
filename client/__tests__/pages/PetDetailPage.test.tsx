import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PetDetailPage from '../../src/pages/PetDetailPage';  // Adjusted import
import { Pet } from '../../types/Pet';
import '@testing-library/jest-dom'


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
const mockGeocodeData = {
    address: {
        city: '',
    },
};
beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

describe('PetDetailPage', () => {
    it('fetches and displays the details of the selected pet', async () => {

        mockedAxios.get.mockRejectedValue('Error fetching your pet details:');
        mockedAxios.get.mockResolvedValue({ status: 200, data: mockPet });
        render(< MemoryRouter>
            <PetDetailPage pet={mockPet} />
        </MemoryRouter>);


        await waitFor(() => {

            expect(screen.getByTestId('petname').textContent).toBe(mockPet.name);
            expect(screen.getByTestId('petage').textContent).toBe(`Age: ${mockPet.age}`);
            expect(screen.getByTestId('petphone').textContent).toBe(mockPet.phone);
            expect('Error fetching your pet details:').toBeInTheDocument;




        })
    });

    it('fetches and displays the city of the pet', async () => {

        mockedAxios.get.mockRejectedValue({ status: 400, data: 'Locatoin not available' })
        mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockGeocodeData });
        render(< MemoryRouter>
            <PetDetailPage pet={mockPet} />
        </MemoryRouter>);


        await waitFor(() => {

            const expectedCity = mockGeocodeData.address.city || 'Location not available';
            expect(screen.getByTestId('petcity')).toHaveTextContent(expectedCity);



        })
    });

    it('should handle a 404 error for pet data', async () => {
        // Mock a 404 response for pet data
        mockedAxios.get.mockRejectedValueOnce({
            response: { status: 404, data: 'Not Found' },
        });

        render(< MemoryRouter>
            <PetDetailPage pet={mockPet} />
        </MemoryRouter>);

        // Wait for the component to finish fetching and handling error
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument(); // Keeps loading or an error message
            expect(console.error).toHaveBeenCalledWith('Error fetching your pet details:', expect.any(Error));
        });
    });
});




