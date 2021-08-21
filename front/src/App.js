import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import React from 'react'
import apikey from './apikey';
import Header from './Header';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const initialCenter = {
  lat: -22.861992298362203,
  lng: -43.22865199868578
};
const libraries = ['places']

function App() {
  
  const { isLoaded } = useJsApiLoader({
    id: 'aglomerados',
    googleMapsApiKey: apikey,
    libraries: libraries
  })

  var empty = []
  const [markers, setMarker] = React.useState(empty);
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState(initialCenter);
  const [bounds, setBounds] = React.useState(null);

  var searchBox = React.useRef(null);  

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
    setBounds(map.getBounds());
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  const onPlacesChanged = () => {
    const place = searchBox.current.getPlaces()[0];
    const geocoder = new window.google.maps.Geocoder();
    geocoder
      .geocode({ placeId: place.place_id })
      .then(({ results }) => {
        setCenter(results[0].geometry.location);
      })
  }

  const onBoundsChanged = () => {
    setBounds(map.getBounds());
  }

  const addMarker = (e) => {
    var num = markers.length;
    var marker = {
      position: e.latLng.toJSON(),
      title:"Aglomeração!",
      label:`Aglomeração #${num}`
    };
    if (markers.length)
      setMarker([...markers, marker])
    else
    setMarker([marker])
    
  }
  return isLoaded ? (
    <div>
      <Header />
      <GoogleMap
        id='map'
        onBoundsChanged={onBoundsChanged}
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
          onLoad={(ref) => (searchBox.current = ref)}
          onPlacesChanged={onPlacesChanged}
          bounds={bounds}
        >
          <input
            type="text"
            placeholder="🔍"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '320px',
              height: '40px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: "absolute",
              left: "50%",
              top: "80px",
              marginLeft: "-160px"
            }}
          />
        </StandaloneSearchBox>
        {markers.map((m, i) => (
          <Marker key={i} position={m.position} title={m.title} />
        ))}
      </GoogleMap>
    </div>
  ) : <></>
}

export default App;
