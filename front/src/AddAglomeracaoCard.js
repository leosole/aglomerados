import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddAglomeracaoForm from "./AddAglomeracaoForm";


export default function AddAglomeracaoCard(props) {

  return (
    <InfoWindow 
      position={props.position}
      onLoad={(ref) => props.returnRef(ref)}
      onClose={() => props.returnRefresh()}
    >
      <Card >
        <CardContent>
          <Typography variant="h5" component="h2">
            Adicione uma aglomeração
          </Typography>
          <AddAglomeracaoForm
            user={props.user}
            latitude={props.latitude}  
            longitude={props.longitude}  
            returnClick={() => props.returnRefresh()}
          />
        </CardContent>
      </Card>
    </InfoWindow>
  );
}
