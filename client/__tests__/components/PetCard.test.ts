import { render, screen } from '@testing-library/react';
import PetCard from '../../src/components/PetCard'; // Adjust the import to your actual path
import  MemoryRouter  from 'react-router-dom'; // We need MemoryRouter to test Link
import { PetCardProps } from '../../types/Components';

// Mock Pet data
const mockPet = {
    _id: '1234',
    name: 'Ginger',
    image: '/images/ginger.jpg', // Mock image URL
};

describe('PetCard', () => {
    it('renders pet information correctly', () => {
        // Render the component with mock data inside MemoryRouter to support Link
      render(<div/>)

        // Check if the pet name is displayed
        expect(screen.getByText(mockPet.name)).toBeInTheDocument();

        // Check if the image is displayed
        const petImage = screen.getByAltText(mockPet.name); // The alt text of the image should be the pet's name
        expect(petImage).toHaveAttribute('src', mockPet.image); // Ensure the correct image src is used

        // Check if the link to the pet details page is present
        const petLink = screen.getByRole('link');
        expect(petLink).toHaveAttribute('href', `/pets/${mockPet._id}`);
    });
});
