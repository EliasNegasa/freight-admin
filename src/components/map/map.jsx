import React from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ center, zoom }) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBDqPocrEtnPFiSKPBjyGRZ4ZhDQ3EiF-Q" }}
        defaultCenter={center}
        defaultZoom={zoom}
      ></GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 8.987926,
    lng: 38.74381,
  },
  zoom: 6,
};

export default Map;
