

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

interface YandexBoundsChangeEvent {
  get: (key: string) => {
    getCenter: () => [number, number];
    getZoom: () => number;
  };
}

interface MapProps {
  locations: PoolLocation[];
  sx?: React.CSSProperties;
}

const PoolMap: React.FC<MapProps> = ({
  locations,
  sx = {
    width: "100%",
    height: "400px",
    borderRadius: "16px",
    overflow: "hidden",
  },
}) => {
  const dispatch = useDispatch();
  const center = useSelector((state: RootState) => state.map.center);
  const zoom = useSelector((state: RootState) => state.map.zoom);

  const handleMapChange = (newCenter: [number, number], newZoom: number) => {
    dispatch(setCenter(newCenter));
    dispatch(setZoom(newZoom));
  };

  return (
    <YMaps query={{ apikey: "4db7472d-2936-422d-9f44-ff9da9481d65" }}>
      <div
        style={{
          ...sx,
          position: "relative",
          borderRadius: sx.borderRadius || "16px",
          overflow: "hidden",
        }}
      >
        <Map
          defaultState={{ center, zoom }}
          style={{
            width: "100%",
            height: "100%",
          }}
          options={{
            suppressMapOpenBlock: true, // Убирает кнопку открытия карты в новом окне
          }}
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
      </div>
    </YMaps>
  );
};

export default PoolMap;
