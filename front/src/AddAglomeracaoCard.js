import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddAglomeracaoForm from "./AddAglomeracaoForm";

const useStyles = makeStyles({
  root: {
    minHeight: 230,
    maxWidth: 300
  },
  title: {
    marginBottom: 6
  }
});

export default function AddAglomeracaoCard(props) {
  const classes = useStyles();

  return (
    <InfoWindow 
      position={props.position}
      onLoad={(ref) => props.returnRef(ref)}
      onClose={() => props.returnRefresh()}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Adicione uma aglomeração
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
