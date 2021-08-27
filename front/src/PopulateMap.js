import React from 'react'
import { Marker } from '@react-google-maps/api';
import CardAglomeracao from './CardAglomeracao';


export default function PopulateMap(props) {
    const [cardVisible, setCardVisible] = React.useState(false)
    const [cardName, setCardName] = React.useState(null)
    const [cardInfo, setCardInfo] = React.useState(null)
    const [anchor, setAnchor] = React.useState(null)
    const [markersList, setMarkersList] = React.useState(null)
    

    const onMarkerLoad = (m) => {
        const temp = props.markers[m.zIndex];
        m.addListener("click", () => {
          setCardName(temp.name);
          setCardInfo(temp.info)
          setAnchor({anchor: m})
          setCardVisible(true);
        })
      }

    return (
        <template>
        {
            props.loaded?
                props.markers.map((m, i) => (
                    <Marker 
                        key={i}
                        zIndex={i}
                        onLoad={onMarkerLoad} 
                        position={m.position} 
                        clickable={true}
                    />
                ))
            :<></>
        }
        {
          cardVisible?
          <CardAglomeracao
            name={cardName}
            info={cardInfo}
            options={anchor}
          />:
          <></>
        }
        </template>
    )
    
}

