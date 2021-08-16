import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import React from 'react'
import apikey from './apikey';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -22.861992298362203,
  lng: -43.22865199868578
};

const google = window.google;

function App() {
  const libraries = ['places']
  const { isLoaded } = useJsApiLoader({
    id: 'aglomerados',
    googleMapsApiKey: apikey,
    libraries: libraries
  })
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  const addMarker = (e) => {
    console.log(map)
    // var marker = new google.maps.Marker({
    //   position: e.latLng.toJSON(),
    //   title:"Hello World!"
    // });
    // marker.setMap(map);
  // TODO objeto map
  }
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={addMarker}
        options={{
          mapId: '739f73fac7cfa997'
        }}
      >
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={
            onPlacesChanged
          }
        >
          <input
            type="text"
            placeholder="🔍"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `320px`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              top: "80px",
              marginLeft: "-160px"
            }}
          />
        </StandaloneSearchBox>
        <Marker
          position={center}
        />
      </GoogleMap>
    </div>
  ) : <></>
}

export default App;
