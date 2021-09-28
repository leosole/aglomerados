import React from 'react'
import Button from "@material-ui/core/Button";
import apiAglomeracao from './apiAglomeracao';
import { Marker } from '@react-google-maps/api'
import { Link } from "react-router-dom"
import CardAglomeracao from './CardAglomeracao'
import AglomeracaoDrawer from './AglomeracaoDrawer'

const urlAglomeracao = '/gatherings/';

export default function PopulateMap(props) {

  const [cardVisible, setCardVisible] = React.useState(false)
  const [cardName, setCardName] = React.useState(null)
  const [cardInfo, setCardInfo] = React.useState(null)
  const [cardID, setCardID] = React.useState(null)
  const [cardLatitude, setCardLatitude] = React.useState(null)
  const [cardLongitude, setCardLongitude] = React.useState(null)
  const [anchor, setAnchor] = React.useState(null)
  const [isAglomeracaoDrawerOpen, setIsAglomeracaoDrawerOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(null)

  const openAglomeracaoDrawer = () => {
    const center = anchor.anchor.getPosition()
    setIsAglomeracaoDrawerOpen(true)
    setCardVisible(false)
    props.setCenter(center)
    props.setZoom(16)
  }
  
  const openFromUrl = (selected) => {
    // GET :id
    // apiAglomeracao.get(urlAglomeracao+':'+props.id)
    // .then((r) =>{
    //   setCardID(r.data._id)
    //   setCardLatitude(r.data.position.lat)
    //   setCardLongitude(r.data.position.lng)
    //   setCardName(r.data.name);
    //   setCardInfo(r.data.info)
    //   setIsAglomeracaoDrawerOpen(true)
    // })
    // .catch((e) => console.log(e))
    
    if(selected){
      setCardID(props.id)
      setCardLatitude(props.lat)
      setCardLongitude(props.lng)
      setCardName(selected.name);
      setCardInfo(selected.info)
      setIsAglomeracaoDrawerOpen(true)
      props.setZoom(16)
    }

  }

  const CardLink = () => {
    return (
      <Button size="small" onClick={() => openAglomeracaoDrawer()}>
        <Link to={`/?id=${cardID}&lat=${cardLatitude}&lng=${cardLongitude}`}>Ver mais</Link>
      </Button>
    )
  }

  const onMarkerLoad = (m) => {
    const temp = props.markers[m.zIndex];
    m.addListener("click", () => {
      setCardID(temp._id)
      setCardLatitude(temp.position.lat)
      setCardLongitude(temp.position.lng)
      setCardName(temp.name);
      setCardInfo(temp.info)
      setAnchor({anchor: m})
      setCardVisible(true)
    })
    if(!selected){
      setSelected(props.markers.filter(m => m._id === props.id)[0])
    }
  }

  React.useEffect(() => {
    if(props.id){
      openFromUrl(selected)
    }
  }, [selected])
  
  return (
    <div>
      {
        props.loaded &&
          props.markers.map((m, i) => (
              <Marker 
                  key={i}
                  zIndex={i}
                  onLoad={onMarkerLoad} 
                  position={m.position} 
                  clickable={true}
              />
          ))
      }
      {
        cardVisible &&
        <CardAglomeracao
          link={<CardLink />}
          name={cardName}
          info={cardInfo}
          options={anchor}
        />
      }
      {
        isAglomeracaoDrawerOpen &&
        <AglomeracaoDrawer
          user={props.user}
          name={cardName}
          info={cardInfo}
          isOpen={isAglomeracaoDrawerOpen} 
          setIsAglomeracaoDrawerOpen={setIsAglomeracaoDrawerOpen}
        />
      }
    </div>
  )
    
}

