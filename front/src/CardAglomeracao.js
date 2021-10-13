import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from "@material-ui/core/Typography";


export default function CardAglomeracao({ info, ...props}) {
  var finalLetter = null
  var littleLetter = null
  var monthlyOptions = null
  if(info.frequency.monthWeekDay){
    finalLetter = info.frequency.monthWeekDay.at(0) === 's' ? 'o' : 'a'
    littleLetter = info.frequency.monthWeekDay.at(0) === 's' ? 'º' : 'ª'
    monthlyOptions = ['1'+littleLetter, '2'+littleLetter, '3'+littleLetter, 'últim'+finalLetter]
  }
  const weekOptions = {
    sunday: 'domingo',
    monday: 'segunda',
    tuesday: 'terça',
    wednesday: 'quarta',
    thursday: 'quinta',
    friday: 'sexta',
    saturday: 'sábado'
  }
  return (
    <InfoWindow options={props.options} onCloseClick={props.handleClose}>
      <Card >
        <CardContent>
          <Typography variant="h5" component="h2">
            {info.name}
          </Typography>
          {
            info.dateString &&
            <div>
              <Typography variant="body2" component="p">
                Data
              </Typography>
              <Typography color="textSecondary">
                {info.dateString}
              </Typography>
            </div>
          }
          {
            info.frequencyType === 'semanal' &&
            <div>
              <Typography variant="body2" component="p">
                Toda semana
              </Typography>
              <Stack direction="row" spacing={1}>
                {info.frequency.sunday && <Chip label="Domingo" color="secondary" variant="outlined" />}
                {info.frequency.monday && <Chip label="Segunda" color="secondary" variant="outlined" />}
                {info.frequency.tuesday && <Chip label="Terça" color="secondary" variant="outlined" />}
                {info.frequency.wednesday && <Chip label="Quarta" color="secondary" variant="outlined" />}
                {info.frequency.thursday && <Chip label="Quinta" color="secondary" variant="outlined" />}
                {info.frequency.friday && <Chip label="Sexta" color="secondary" variant="outlined" />}
                {info.frequency.saturday && <Chip label="Sábado" color="secondary" variant="outlined" />}
              </Stack>
            </div>
          }
          {
            info.frequency.monthWeek &&
            <Chip 
              color="secondary"
              variant="outlined"
              label={`Tod${finalLetter} ${monthlyOptions[info.frequency.monthWeek-1]} ${weekOptions[info.frequency.monthWeekDay]} do mes`}  
            />
          }
          <Typography variant="body2" component="p">
            Hora
          </Typography>
          <Typography color="textSecondary">
            {info.time}
          </Typography>
          {info.info.map((i, n) => (
            i.value &&
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
        <CardActions>
          {props.link}
        </CardActions>
      </Card>
    </InfoWindow>
  );
}
