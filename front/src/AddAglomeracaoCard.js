import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddAglomeracaoForm from "./AddAglomeracaoForm";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 230,
  }
});

export default function AddAglomeracaoCard(props) {
  const classes = useStyles();
  const onLoad = (ref) => {
    props.returnRef(ref)
  }

  return (
    <InfoWindow 
      position={props.position}
      onLoad={onLoad}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Adicione uma aglomeração aqui
          </Typography>
          <AddAglomeracaoForm
            latitude={props.latitude}  
            longitude={props.longitude}  
            returnClick={() => props.returnRefresh()}
          />
        </CardContent>
      </Card>
    </InfoWindow>
  );
}
