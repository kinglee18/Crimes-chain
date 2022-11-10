import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Autocomplete, Circle, DrawingManager, GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { CircleProps, coordinates } from "../utils/interfaces";
import { Box, Button, Stack } from "@mui/material";

const containerStyle = {
  height: "400px",
  width: "1200px"
};


const libs: any = ["places", "drawing", "geometry", "localContext", "visualization"];

interface MapProps {
  onCircleComplete: (polyline: google.maps.Circle) => void,
  initialPosition: GeolocationPosition,
  locationsToDraw?: CircleProps[],
  enableControls?: boolean
}
export const CrimesMap = ({ initialPosition, onCircleComplete, locationsToDraw = [], enableControls= false}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAfhWVj6nQJLae8EJtJ5zPBgbz8tKa38Uw",
    libraries: libs
  })

  const [centerPosition, setCenterPosition] = useState(initialPosition);
  const [map, setMap] = useState(null)
  const [autocomplete, setAutocomplete] = useState<Autocomplete | null>(null);
  const [circles, setCircles] = useState<CircleProps[]>([]);




  useEffect(() => {
    //setCircles([...locationsToDraw]);
    
  }, [locationsToDraw]);


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({ lat: centerPosition.coords.latitude, lng: centerPosition.coords.longitude });
    map.fitBounds(bounds);
    setMap(map)
  }, [centerPosition.coords.latitude, , centerPosition.coords.longitude])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const autocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  }

  const onPlaceChanged = () => {
    if (autocomplete) {

      setCenterPosition(autocomplete.getPlace().geometry.location)
    }
  }
  const addLocation = () => {
    setCircles(prev => ([...prev, {
      coordinates: {
        lat: centerPosition.coords.latitude,
        lng: centerPosition.coords.longitude
      },
      radius: 1.2,
      draggable: true,
      editable: true,
    }]));
  };
  const deleteLocation = () => {

  };
  return isLoaded ? (
    <>
      { enableControls && 
        <Stack direction='column' spacing={3}>
          <Button variant="outlined" onClick={addLocation}>Add Location</Button>
          <Button variant="outlined" onClick={deleteLocation}>Delete Location</Button>
        </Stack>
      }
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: centerPosition?.coords.latitude, lng: centerPosition?.coords.longitude }}
        zoom={0}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          <Autocomplete
            onLoad={autocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search a place"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete>
          {
            circles.map((location, index) => (
              <Circle
                key={`circle_${index}`}
                center={location.coordinates}
                options={{
                  radius: location.radius,
                  draggable: location.draggable,
                  editable: location.editable,
                }}
              />
            ))
          }
        </>
      </GoogleMap>
    </>
  ) : <>Loading Map</>
};
