// src/slices/map/Map.tsx

import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCenter, setZoom } from "./mapSlice";

interface PoolLocation {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface MapProps {
  locations: PoolLocation[];
}

interface YandexBoundsChangeEvent {
  get: (key: string) => {
    getCenter: () => [number, number];
    getZoom: () => number;
  };
}

const PoolMap: React.FC<MapProps> = ({ locations }) => {
  const dispatch = useDispatch();
  const center = useSelector((state: RootState) => state.map.center);
  const zoom = useSelector((state: RootState) => state.map.zoom);

  const handleMapChange = (newCenter: [number, number], newZoom: number) => {
    dispatch(setCenter(newCenter));
    dispatch(setZoom(newZoom));
  };

  return (
    <YMaps query={{ apikey: "4db7472d-2936-422d-9f44-ff9da9481d65" }}>
      <Map
        defaultState={{ center, zoom }}
        width="80%"
        height="600px"
        onBoundsChange={(e: YandexBoundsChangeEvent) => {
          const newCenter = e.get("target").getCenter();
          const newZoom = e.get("target").getZoom();
          handleMapChange(newCenter as [number, number], newZoom);
        }}
      >
        {locations.map((location) => (
          <Placemark
            key={location.id}
            geometry={location.coordinates}
            properties={{ balloonContent: location.name }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default PoolMap;
