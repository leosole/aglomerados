import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { Input, InputAdornment } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'
import Header from './Header';
import apiAglomeracao from './apiAglomeracao';
import PopulateMap from './PopulateMap';
import AddAglomeracaoCard from './AddAglomeracaoCard';
import CreateProfileDrawer from './CreateProfileDrawer';
import LogInDrawer from './LogInDrawer';
import AglomeracaoFilter from './AglomeracaoFilter';
import localization from './localization';

const urlAglomeracao = '/gatherings/';

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


function App(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'aglomerados',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
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
  const [user, setUser] = React.useState(null)
  const [zoom, setZoom] = React.useState(14)
  const [filterParams, setFilterParams] = React.useState(null)
  var isChanging = [false, false]
  var markerArray = []

  const setMarkerArray = (m) => {
    markerArray = m
  }

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

  const handleClean = () => {
    setFilterParams(null)
  }

  const handleFilter = async (e) => {
    const {startDate, endDate, startTime, endTime} = e
    var params = {}
    await clearMarkers()
    if(startDate && endDate) {
      params.minDate = startDate.getTime()
      params.maxDate = endDate.getTime()      
    }
    if(startTime && endTime) {
      params.minTime = startTime.getHours() 
      params.maxTime = endTime.getHours() 
    }
    setFilterParams(params)
  }

  React.useEffect(() => {
    onTilesLoaded()
  },[filterParams])

  const getFilteredMarkers = async (minLat,maxLat,minLng,maxLng) =>{
    var requestUrl = urlAglomeracao+ "?minLat="+ minLat+"&maxLat="+ maxLat+"&minLng=" + minLng +"&maxLng=" + maxLng
    for(var i in filterParams) {
      requestUrl += '&' + i + '=' + filterParams[i]
    }
    console.log(requestUrl)
    apiAglomeracao.get(requestUrl)
    .then((r) =>{
      console.log(r.data)
      loadMarkers(r.data)
    })
    .catch((e) => console.log(e))
  }

  const clearMarkers = () => {
    for (var i in markerArray)
      markerArray[i].setMap(null)
    setMarkerArray(null)
  }

  const loadMarkers = async (data) => {
    setLoaded(false)
    setMarkers(null)
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

  const onTilesLoaded = async () => {
    if(map) {
      setBounds(map.getBounds())
      var minLat = map.getBounds().tc.g;
      var maxLat = map.getBounds().tc.i;
      var maxLng = map.getBounds().Hb.i;
      var minLng = map.getBounds().Hb.g;
      setZoom(map.getZoom())
      await getFilteredMarkers(minLat,maxLat,minLng,maxLng);
    }
  }

  const addAglomeracao = (e) => {
    if(!isLoggedIn)
      return    
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

  React.useEffect(() => {
    if (props.lat && props.lng) {
      setCenter({lat:parseFloat(props.lat), lng:parseFloat(props.lng)})
    } else {
      localization(setCenter)
    }
  }, [])

  return isLoaded && (
    <div>
      <GoogleMap
        id='map'
        onTilesLoaded={onTilesLoaded}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={addAglomeracao}
        options={mapOptions}
      >
        <Header 
          openCreateProfileDrawer={openCreateProfileDrawer}
          openLogInDrawer={openLogInDrawer}
          isLoggedIn={isLoggedIn}
          logOff={logOff} />
        <CreateProfileDrawer 
          isOpen={isCreateProfileOpen} 
          setIsCreateProfileOpen={setIsCreateProfileOpen}
          setUser={setUser}
          logIn={logIn} />
        <LogInDrawer 
          isOpen={isLogInDrawerOpen} 
          setIsCreateProfileOpen={setIsLogInDrawerOpen}
          setUser={setUser}
          logIn={logIn} />
        
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
              endAdornment={
                <InputAdornment position="end">
                  <AglomeracaoFilter handleFilter={handleFilter} handleClean={handleClean}/>
                </InputAdornment>
              }
            />
          </StandaloneSearchBox>
          
        </ThemeProvider>
        <PopulateMap 
          id={props.id}
          user={user?.user}
          bounds={bounds}
          markers={markers}
          loaded={loaded}
          map={map}
          setCenter={setCenter}
          setZoom={setZoom}
          setMarkerArray={setMarkerArray}
        />
        {
          newAglomeracao &&
          <AddAglomeracaoCard
            user={user}
            position={newAglomeracao.position}
            latitude={newAglomeracao.latitude}
            longitude={newAglomeracao.longitude}
            returnRef={(ref) => setAglomeracaoCard(ref)}
            returnRefresh={() => refresh()}
          /> 
        }
      </GoogleMap>
    </div>
  ) 
}

export default App;
