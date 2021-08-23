import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import React from 'react'
import apikey from './apikey';
import Header from './Header';
import api from './api';
import PopulateMap from './PopulateMap';

const url = '/gatherings/';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const initialCenter = {
  lat: -22.861992298362203,
  lng: -43.22865199868578
};
const libraries = ['places']

const mapOptions = {
  mapId: '739f73fac7cfa997',
  mapTypeControlOptions: {
    position: 6,
  },
  fullscreenControlOptions: {
    position: 9,
  },
}

function App() {
  
  const { isLoaded } = useJsApiLoader({
    id: 'aglomerados',
    googleMapsApiKey: apikey,
    libraries: libraries
  })

  var empty = []
  const [markers, setMarkers] = React.useState(empty);
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState(initialCenter);
  const [bounds, setBounds] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false)
  
  const getMarkers = () =>{
    api.get(url)
    .then((r) =>{
      loadMarkers(r.data)
    })
    .catch((e) => console.log(e))
  }

  const loadMarkers = (data) => {
    data.map((m) => {
      m.position.lat = parseFloat(m.position.lat)
      m.position.lng = parseFloat(m.position.lng)
    })
    setMarkers(data)
    setLoaded(true)
  }

  var searchBox = React.useRef(null);  

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
    setBounds(map.getBounds());
    getMarkers();
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
    getMarkers();
  }

  // const onMarkerLoad = (m) => {
  //   const info = markers[m.zIndex];
  //   m.addListener("click", () => {
  //     setCardType(info.type);
  //     setCardName(info.name);
  //     setAnchor({anchor: m})
  //     setCardVisible(true);
  //   })
  // }

  // const addMarker = (e) => {
  //   var num = markers.length;
  //   var marker = {
  //     position: e.latLng.toJSON(),
  //     name:`Aglomeração #${num}`,
  //     type:`tipo #${num}`
  //   };
  //   if (markers.length)
  //     setMarkers([...markers, marker])
  //   else
  //   setMarkers([marker])
    
  // }

  // const handleCallback = (m) =>{
  //   setMarkers(m);
  // } 

  return isLoaded ? (
    <div>
      <GoogleMap
        id='map'
        onBoundsChanged={onBoundsChanged}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // onClick={addMarker}
        options={mapOptions}
      >
        <Header />
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
        <PopulateMap 
          bounds={bounds}
          markers={markers}
          loaded={loaded}
        />
        {/* {markers.map((m, i) => (
          <Marker 
            key={i}
            onLoad={onMarkerLoad} 
            position={m.position} 
            zIndex={i}
            clickable={true}
          />
        ))}
        {
          cardVisible?
          <CardAglomeracao
            name={cardName}
            type={cardType}
            info={[
              {key:"Hora", value:"20:00"},
              {key:"Outra chave", value:"teste"}
            ]}
            options={anchor}
          />:
          <></>
        } */}
      </GoogleMap>
    </div>
  ) : <></>
}

export default App;
