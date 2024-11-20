import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MapComponent from "../../src/components/MapComponent";
import { Pet } from "../../types/Pet";

// Mock Leaflet components
jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="title-layer" />,
  Marker: ({
    position,
    children,
  }: {
    position: [number, number];
    children: React.ReactNode;
  }) => (
    <div data-testid="marker" data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));

// Define sample pet data
const samplePets: Pet[] = [
  {
    _id: "1",
    name: "Buddy",
    age: 3,
    location: { lat: 51.505, lng: -0.09 },
    shelterName: "Happy Tails Shelter",
    type: "",
    favorite: false,
    breed: "",
    gender: "",
    city: "",
    description: "",
    image: "",
    available: false,
    phone: "",
    email: "",
  },
  {
    _id: "2",
    name: "Mittens",
    age: 5,
    location: { lat: 51.505, lng: -0.09 },
    shelterName: "No Shelter Name",
    type: "",
    favorite: false,
    breed: "",
    gender: "",
    city: "",
    description: "",
    image: "",
    available: false,
    phone: "",
    email: "",
  },
];

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

describe("MapComponent", () => {
  it("renders the map container", () => {
    render(
      <BrowserRouter>
        <MapComponent pets={[]} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });

  it("renders the correct number of markers based on pets", () => {
    render(
      <BrowserRouter>
        <MapComponent pets={samplePets} />
      </BrowserRouter>
    );
    const markers = screen.getAllByTestId("marker");
    expect(markers).toHaveLength(samplePets.length);
  });

  it("renders popups with correct pet information", () => {
    render(
      <BrowserRouter>
        <MapComponent pets={samplePets} />
      </BrowserRouter>
    );

    const popupContents = screen.getAllByTestId("popup");
    expect(popupContents[0]).toHaveTextContent("Buddy");
    expect(popupContents[0]).toHaveTextContent("Age: 3");
    expect(popupContents[0]).toHaveTextContent("Happy Tails Shelter");
    expect(popupContents[1]).toHaveTextContent("Mittens");
    expect(popupContents[1]).toHaveTextContent("Age: 5");
    expect(popupContents[1]).toHaveTextContent("No Shelter Name");
  });

  it("includes links to pet details", () => {
    render(
      <BrowserRouter>
        <MapComponent pets={samplePets} />
      </BrowserRouter>
    );

    const links = screen.getAllByText("View Details");
    expect(links).toHaveLength(samplePets.length);

    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `/pets/${samplePets[index]._id}`);
    });
  });
});
