import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// props:
// options.anchor (marker)
// type, name (string)
// info [{key, value}] list
export default function CardAglomeracao(props) {
  const classes = useStyles();

  return (
    <InfoWindow options={props.options}>
      <Card className={classes.root}>
        <CardContent>
          {/* <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.type}
          </Typography> */}
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          {props.info.map((i, n) => (
            <div key={n}>
              <Typography variant="body2" component="p">
                {i.key}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {i.value}
              </Typography>
            </div>
          ))}
        </CardContent>
        <CardActions>
          <Button size="small">Compartilhar</Button>
        </CardActions>
      </Card>
    </InfoWindow>
  );
}
