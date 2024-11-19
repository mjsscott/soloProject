import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PetListPage from '../../src/pages/PetListPage';
import { Pet } from '../../types/Pet';
import '@testing-library/jest-dom'


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



describe('PetListPage', () => {
    it('lists and filters a list of pets', async () => {


        render(
            <PetListPage></PetListPage>
        );


        await waitFor(() => {

            expect(mockedAxios).toHaveBeenCalled();



        })
    });
});



