import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { Input, InputAdornment } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'
import apikey from './apikey';
import Header from './Header';
import api from './api';
import PopulateMap from './PopulateMap';
import AddAglomeracaoCard from './AddAglomeracaoCard';
import CreateProfileDrawer from './CreateProfileDrawer';
import LogInDrawer from './LogInDrawer';

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [markers, setMarkers] = React.useState(empty)
  const [map, setMap] = React.useState(null)
  const [center, setCenter] = React.useState(initialCenter)
  const [bounds, setBounds] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)
  const [newAglomeracao, setNewAglomeracao] = React.useState(null)
  const [aglomeracaoCard, setAglomeracaoCard] = React.useState(null);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = React.useState(false)
  const [isLogInDrawerOpen, setIsLogInDrawerOpen] = React.useState(false)

  const theme = createTheme({
    overrides: {
      
      MuiInputBase: {
        input: {
          border: "0 ",
          padding: "12px"
        },
      }
    },
  });

  const logOff = () => setIsLoggedIn(false)
  const logIn = () => setIsLoggedIn(true)

  const openCreateProfileDrawer = () => setIsCreateProfileOpen(!isCreateProfileOpen)
  const openLogInDrawer = () => setIsLogInDrawerOpen(!isLogInDrawerOpen)

  const getFilteredMarkers = (minLat,maxLat,minLng,maxLng) =>{
    var requestUrl = url+ "?minLat="+ minLat+"&maxLat="+ maxLat+"&minLng=" + minLng +"&maxLng=" + maxLng;
    api.get(requestUrl)
    .then((r) =>{
      loadMarkers(r.data)
    })
    .catch((e) => console.log(e))
  }

  const loadMarkers = (data) => {
    data.map((m) => {
      m.position.lat = parseFloat(m.position.lat)
      m.position.lng = parseFloat(m.position.lng)
      return m
    })
    setMarkers(data)
    setLoaded(true)
  }

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
        console.log(results[0].geometry.location)
      })
  }

  const onTilesLoaded = () => {
    setBounds(map.getBounds())
    var minLat = map.getBounds().tc.g;
    var maxLat = map.getBounds().tc.i;
    var maxLng = map.getBounds().Hb.i;
    var minLng = map.getBounds().Hb.g;
    getFilteredMarkers(minLat,maxLat,minLng,maxLng);
  }

  const addAglomeracao = (e) => {
    var info = {
      position: e.latLng.toJSON(),
      latitude: e.latLng.toJSON().lat,
      longitude: e.latLng.toJSON().lng
    };
    setNewAglomeracao(info)
    if (aglomeracaoCard) {
      aglomeracaoCard.open({
        position: info.position,
        map: map
      })
    }
  }

  const refresh = () => {
    setNewAglomeracao(null)
    aglomeracaoCard.close()
    setAglomeracaoCard(null)
    var minLat = map.getBounds().tc.g;
    var maxLat = map.getBounds().tc.i;
    var maxLng = map.getBounds().Hb.i;
    var minLng = map.getBounds().Hb.g;
    getFilteredMarkers(minLat,maxLat,minLng,maxLng);
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        id='map'
        onTilesLoaded={onTilesLoaded}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={addAglomeracao}
        options={mapOptions}
      >
        <Header 
          openCreateProfileDrawer={openCreateProfileDrawer}
          openLogInDrawer={openLogInDrawer}
          isLoggedIn={isLoggedIn}
          logOff={logOff}
          logIn={logIn} />
        <CreateProfileDrawer 
          isOpen={isCreateProfileOpen} 
          setIsCreateProfileOpen={setIsCreateProfileOpen} />
        <LogInDrawer 
          isOpen={isLogInDrawerOpen} 
          setIsCreateProfileOpen={setIsLogInDrawerOpen} />
        <ThemeProvider theme={theme}>
          <StandaloneSearchBox
            onLoad={(ref) => (searchBox.current = ref)}
            onPlacesChanged={onPlacesChanged}
            bounds={bounds}
          >
            <Input
              disableUnderline={true}
              type="search"
              placeholder="Pesquise aqui"
              style={{
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '320px',
                // height: '40px',
                padding: '6px 16px',
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
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </StandaloneSearchBox>
        </ThemeProvider>
        <PopulateMap 
          bounds={bounds}
          markers={markers}
          loaded={loaded}
        />
        {
          newAglomeracao?
          <AddAglomeracaoCard
            position={newAglomeracao.position}
            latitude={newAglomeracao.latitude}
            longitude={newAglomeracao.longitude}
            returnRef={(ref) => setAglomeracaoCard(ref)}
            returnRefresh={() => refresh()}
          /> :
          <></>
        }
      </GoogleMap>
    </div>
  ) : <></>
}

export default App;
