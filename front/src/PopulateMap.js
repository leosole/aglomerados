import React from 'react'
import Button from "@material-ui/core/Button";
import apiAglomeracao from './apiAglomeracao';
import { Marker } from '@react-google-maps/api'
import { Link } from "react-router-dom"
import CardAglomeracao from './CardAglomeracao'
import AglomeracaoDrawer from './AglomeracaoDrawer'

const urlAglomeracao = '/gatherings';


function useMarkerRef(marker, markerArray, setMarkerArray) {
  React.useEffect(() => {
    if (markerArray) setMarkerArray( ...markerArray, marker)
    else setMarkerArray([marker])
  })
  return markerArray
}

export default function PopulateMap(props) {

  const [cardVisible, setCardVisible] = React.useState(false)
  const [cardName, setCardName] = React.useState(null)
  const [cardInfo, setCardInfo] = React.useState(null)
  const [cardID, setCardID] = React.useState(null)
  const [cardLatitude, setCardLatitude] = React.useState(null)
  const [cardLongitude, setCardLongitude] = React.useState(null)
  const [anchor, setAnchor] = React.useState(null)
  const [isAglomeracaoDrawerOpen, setIsAglomeracaoDrawerOpen] = React.useState(false)
  var markerArray = []
  

  const openAglomeracaoDrawer = () => {
    const center = anchor.position
    setIsAglomeracaoDrawerOpen(true)
    setCardVisible(false)
    props.setCenter(center)
    props.setZoom(16)
  }
  
  const openFromUrl = () => {
    apiAglomeracao.get(urlAglomeracao+':'+props.id)
    .then((r) =>{
      setCardID(r.data[0]._id)
      setCardLatitude(r.data[0].position.lat)
      setCardLongitude(r.data[0].position.lng)
      setCardInfo(r.data[0])
      setIsAglomeracaoDrawerOpen(true)
      props.setZoom(16)
    })
    .catch((e) => console.log(e))
    

  }

  const CardLink = () => {
    return (
      <Link to={`/?id=${cardID}&lat=${cardLatitude}&lng=${cardLongitude}`}>
        <Button size="small" onClick={() => openAglomeracaoDrawer()} >
          Ver mais
        </Button>
      </Link>
    )
  }

  const saveRefs = m => {
    if(m){
      markerArray.push(m.marker)
      props.setMarkerArray(markerArray)
    }
  }

  const handleClick = (e, m) => {
    console.log(m)
    setCardID(m._id)
    setCardLatitude(m.position.lat)
    setCardLongitude(m.position.lng)
    setCardInfo(m)
    setAnchor({position: m.position})
    setCardVisible(true)
  }

  React.useEffect(() => {
    if(props.id){
      openFromUrl()
    }
  }, [])
  

  return (
    <div>
      {
        props.loaded &&
          props.markers.map((m, i) => (
              <Marker 
                key={i}
                ref={saveRefs}
                onClick={(e) => handleClick(e, m)}
                position={m.position} 
                clickable={true}
              />
          ))
      }
      {
        cardVisible &&
        <CardAglomeracao
          handleClose={() => setCardVisible(false)}
          link={<CardLink />}
          info={cardInfo}
          options={anchor}
        />
      }
      {
        isAglomeracaoDrawerOpen &&
        <AglomeracaoDrawer
          user={props.user}
          info={cardInfo}
          isOpen={isAglomeracaoDrawerOpen} 
          setIsAglomeracaoDrawerOpen={setIsAglomeracaoDrawerOpen}
        />
      }
    </div>
  )
    
}

