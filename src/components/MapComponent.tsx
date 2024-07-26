import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Box } from "@mui/material";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

interface PositionStateInterface {
  lat: number;
  lng: number;
}

const LocationMarker = ({
  setPosition,
}: {
  setPosition: (position: PositionStateInterface | null) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return null;
};

const MapComponent = () => {
  const [position, setPosition] = useState<PositionStateInterface | null>(null);
  const { setLocation } = useContext(LocationContext);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (position) {
      setLocation(position);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer center={[35.7219, 51.3347]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && <Marker position={position} />}
        <LocationMarker setPosition={setPosition} />
      </MapContainer>
      {position && (
        <Box
          sx={{
            position: "absolute",
            bottom: 86,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Location
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;
