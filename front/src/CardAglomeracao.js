import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


export default function CardAglomeracao(props) {

  return (
    <InfoWindow options={props.options} onCloseClick={props.handleClose}>
      <Card >
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          {props.info.map((i, n) => (
            <div key={n}>
              <Typography variant="body2" component="p">
                {i.key}
              </Typography>
              <Typography color="textSecondary">
                {i.value}
              </Typography>
            </div>
          ))}
        </CardContent>
        <CardActions>{props.link}
          {/* <Button size="small" onClick={() => props.openAglomeracaoDrawer()}>Ver mais</Button> */}
        </CardActions>
      </Card>
    </InfoWindow>
  );
}
