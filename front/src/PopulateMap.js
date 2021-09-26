import React from 'react'
import { Marker } from '@react-google-maps/api'
import CardAglomeracao from './CardAglomeracao'
import AglomeracaoDrawer from './AglomeracaoDrawer'

export default function PopulateMap(props) {
  const [cardVisible, setCardVisible] = React.useState(false)
  const [cardName, setCardName] = React.useState(null)
  const [cardInfo, setCardInfo] = React.useState(null)
  const [anchor, setAnchor] = React.useState(null)
  const [isAglomeracaoDrawerOpen, setIsAglomeracaoDrawerOpen] = React.useState(false)

  const openAglomeracaoDrawer = () => {
    setIsAglomeracaoDrawerOpen(true)
    setCardVisible(false)
    props.setCenter(anchor.anchor.getPosition())
    props.setZoom(16)
  }
  
  const onMarkerLoad = (m) => {
      const temp = props.markers[m.zIndex];
      m.addListener("click", () => {
        setCardName(temp.name);
        setCardInfo(temp.info)
        setAnchor({anchor: m})
        setCardVisible(true)
      })
    }

  return (
      <template>
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
          openAglomeracaoDrawer={openAglomeracaoDrawer}
          name={cardName}
          info={cardInfo}
          options={anchor}
        />
      }
      {
        isAglomeracaoDrawerOpen &&
        <AglomeracaoDrawer
          name={cardName}
          info={cardInfo}
          isOpen={isAglomeracaoDrawerOpen} 
          setIsAglomeracaoDrawerOpen={setIsAglomeracaoDrawerOpen}
        />
      }
      </template>
  )
    
}

