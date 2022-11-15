import React, { Dispatch, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Autocomplete, Circle, GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { CircleProps, coordinates } from "../utils/interfaces";
import { Box, Button, Stack } from "@mui/material";

const containerStyle = {
  height: "400px",
  width: "1200px"
};


const libs: any = ["places", "drawing", "geometry", "localContext", "visualization"];

interface MapProps {
  initialPosition: GeolocationPosition,
  locations?: CircleProps[],
  enableControls?: boolean,
  setLocations?: Dispatch<any>
}
export const CrimesMap = ({ initialPosition, locations = [], enableControls= false, setLocations}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAfhWVj6nQJLae8EJtJ5zPBgbz8tKa38Uw",
    libraries: libs
  })

  const [centerPosition, setCenterPosition] = useState(initialPosition);
  const [map, setMap] = useState(null)
  const [autocomplete, setAutocomplete] = useState<Autocomplete | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number>();


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
      setCenterPosition({coords: { 
        latitude: autocomplete.getPlace().geometry.location.lat(),
        longitude: autocomplete.getPlace().geometry.location.lng(),
      }})
    }
  }
  const addLocation = () => {
    setLocations(prev => ([...prev, {
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
    if(selectedLocation !== undefined) {
      const newLocations = [...locations];
      newLocations.splice(selectedLocation, 1);
      setLocations(newLocations);
    }
  };

  const onCircleDrag = (e: any, index: number) => {
    const newLocations = [...locations];
    const removed = newLocations.splice(index, 1);
    setLocations([...newLocations, {
      coordinates: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      },
      radius: removed[0].radius,
      editable: true
    }]);
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
            locations.map((location, index) => (
              <Circle
                key={`circle_${index}`}
                center={location.coordinates}
                options={{
                  radius: location.radius,
                  draggable: location.draggable,
                  editable: location.editable,
                  strokeColor: selectedLocation === index ? 'red' :'black'
                }}
                onClick={() => setSelectedLocation(index)}
                onDragEnd={e => onCircleDrag(e, index)}
              />
            ))
          }
        </>
      </GoogleMap>
    </>
  ) : <>Loading Map</>
};
