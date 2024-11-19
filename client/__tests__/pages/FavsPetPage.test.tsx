import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import FavoritePetsPage from '../../src/pages/FavsPetPage';
import { Pet } from '../../types/Pet';
import '@testing-library/jest-dom'
import { mockPets } from '../../__mocks__/mockPets';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

describe('PetFavsPage', () => {
    it('fetches and displays the favorite pets', async () => {

        mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockPets });

        render(< MemoryRouter>
            <FavoritePetsPage favorites={mockPets} />
        </MemoryRouter>);


        await waitFor(() => {






        })
    });



    it('should handle a 404 error for pet data', async () => {

        mockedAxios.get.mockRejectedValueOnce({
            response: { status: 404, data: 'Not Found' },
        });

        render(< MemoryRouter>
            <PetDetailPage pet={mockPet} />
        </MemoryRouter>);


        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
            expect(console.error).toHaveBeenCalledWith('Error fetching your pet details:', expect.any(Error));

        });
    });
});




