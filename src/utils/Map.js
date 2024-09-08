import React, { useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import NewBuildingSection from '../functions/building';

const containerStyle = {
  width: '100%',
  height: '60vh',
  position: 'relative',
};

const center = {
  lat: 1.6508,
  lng: 17.3,
};

const options = {
  restriction: {
    latLngBounds: {
      north: 37.0,
      south: -35.0,
      west: -20.0,
      east: 52.0,
    },
    strictBounds: true,
  },
  mapTypeId: 'terrain',
  disableDefaultUI: true,
};

const libraries = ['places'];

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB_s1D3GSXknyLLIwX1e35-hNeKeR36RTM',
    libraries: libraries,
  });

  const mapRef = useRef(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div ref={mapRef} style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        options={options}
      />
      <NewBuildingSection mapRef={mapRef} />
    </div>
  );
};

export default Map;
