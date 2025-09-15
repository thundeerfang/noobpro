// src/components/MapView.jsx
import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import IssuesSidebar from "./IssuesSidebar";

export default function MapView({ issues = [] }) {
  const [viewState, setViewState] = React.useState({
    longitude: 77.209,
    latitude: 28.6139,
    zoom: 5,
  });

  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Marker longitude={77.209} latitude={28.6139} color="red" />

        {showPopup && (
          <Popup
            longitude={77.209}
            latitude={28.6139}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            <div>📍 Delhi</div>
          </Popup>
        )}
      </Map>
      <IssuesSidebar issues={issues} />

    </div>
  );
}
