import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PetListPage from '../../src/pages/PetListPage';
import '@testing-library/jest-dom';
import {mockPets} from '../../__mocks__/mockPets';



jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



describe('PetListPage', () => {
    it('lists and filters a list of pets', async () => {

        mockedAxios.get.mockResolvedValue({ status: 200, data: mockPets });
        render(
            <PetListPage></PetListPage>
        );
/*         fireEvent.change(screen.getByPlaceholderText('Type (e.g., Cat)'), { target: { value: 'Cat' } }); */



    });
});



