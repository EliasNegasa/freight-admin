import React, { useState, useEffect, useRef, useCallback } from "react";
import { Map, TileLayer } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./style/tracker.scss"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import LowbedMarker from "./lowbedMarker";
import LowbedInfoPanel from "./lowbedInfoPanel";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationTracker = () => {
    const position = [8.980603, 38.757759];
    const mapRef = useRef(null);
    let viewChangeCancel = useRef(null);

    const [lowbeds, setLowbeds] = useState([]);
    const [updateInterval, setUpdateInterval] = useState();
    const [selectedLowbed, setSelectedLowbed] = useState(null);

    const updateLowbeds = useCallback(async () => {
        try {
            if (viewChangeCancel.current) {
                viewChangeCancel.current();
                viewChangeCancel.current = null;
            }

            const bounds = mapRef.current.leafletElement.getBounds();

            // const res = await axios.get(
            //     `https://Devistry:devistryopensky@opensky-network.org/api/states/all?lamin=${bounds._southWest.lat}&lomin=${bounds._southWest.lng}&lamax=${bounds._northEast.lat}&lomax=${bounds._northEast.lng}`,
            //     {
            //         cancelToken: new axios.CancelToken((c) => {
            //             viewChangeCancel.current = c;
            //         }),
            //     }
            // );
            const res = await axios.get(
                `https://machinery-api.herokuapp.com/api/users/latmin=${bounds._southWest.lat}&longmin=${bounds._southWest.lng}&latmax=${bounds._northEast.lat}&longmax=${bounds._northEast.lng}`,
                {
                    cancelToken: new axios.CancelToken((c) => {
                        viewChangeCancel.current = c;
                    }),
                }
            );
            setLowbeds(res.data);
        } catch (err) { }
    }, []);

    useEffect(() => {
        updateLowbeds();

        const i = setInterval(updateLowbeds, 10000);
        setUpdateInterval(i);
    }, [updateLowbeds]);

    useEffect(() => {
        return () => clearInterval(updateInterval);
    }, [updateInterval]);

    const renderLowbeds = () => {
        let num = 0;
        return lowbeds.map((lowbed, i) => {
            num++;
            if (num > 500) return null;
            return lowbed.address.lat && lowbed.address.long ? (
                <LowbedMarker
                    key={i}
                    lowbed={lowbed}
                    setSelectedLowbed={setSelectedLowbed}
                ></LowbedMarker>
            ) : null;
        });
    };

    return (
        <div>
            <Map
                center={position}
                zoom={7}
                style={{ height: "calc(100vh - 150px)", width: "100%" }}
                // onzoomend={onViewChange}
                onmoveend={updateLowbeds}
                minZoom={3}
                ref={mapRef}
                className="map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {lowbeds && renderLowbeds()}
            </Map>
            {selectedLowbed && (
                <LowbedInfoPanel
                    lowbed={selectedLowbed}
                    setSelectedLowbed={setSelectedLowbed}
                />
            )}
        </div>
    );
};

export default LocationTracker;
