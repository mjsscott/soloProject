import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import FavoritePetsPage from "../../src/pages/FavsPetPage";
import { Pet } from "../../types/Pet";
import "@testing-library/jest-dom";
import { mockPets } from "../../__mocks__/mockPets";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((message) => {
    if (message.includes("React Router Future Flag Warning")) {
      return;
    }
    console.warn(message);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("PetFavsPage", () => {
  it("fetches and displays the favorite pets", async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockPets });

    render(
      <MemoryRouter>
        <FavoritePetsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("petlist")).toBeInTheDocument();
      expect(screen.getByText("Buddy")).toBeInTheDocument();
      const petLink = screen.getByRole("link", { name: /buddy/i });
      expect(petLink).toHaveAttribute("href", "/pets/13421401");
    });
  });
});
