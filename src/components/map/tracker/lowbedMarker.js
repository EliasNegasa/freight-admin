import React from "react";
import { Marker } from "react-leaflet";

const LowbedMarker = ({ lowbed, setSelectedLowbed }) => {

  const lat = lowbed.address.lat;
  const lon = lowbed.address.long;

  return (
    <Marker position={[lat, lon]} onclick={() => setSelectedLowbed(lowbed)}>

    </Marker>
  );
};

export default LowbedMarker;
