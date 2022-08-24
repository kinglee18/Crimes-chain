import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const CrimesMap = () => {
  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyAfhWVj6nQJLae8EJtJ5zPBgbz8tKa38Uw",
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: { lng: -98.875453, lat: 19.332202 },
        zoom: 16,
      });
      const marker = new google.maps.Marker({
        position: { lng: -98.875453, lat: 19.332202 },
        map: map,
      });
    });
  }, []);
  return (
    <div
      id="map"
      ref={googlemap}
      style={{ width: "2100px", height: "400px" }}
    />
  );
};
