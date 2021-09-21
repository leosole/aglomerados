import React from "react";
import { useForm } from "react-hook-form";
import { Button, InputLabel, FormControl, Select, MenuItem, TextField, FormLabel, FormGroup, Checkbox, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import { DatePicker,  LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment'
import api from "./api";

const url = '/gatherings';

export default function AddAglomeracaoForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [frequency, setFrequency] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date());
  const [gender, setGender] = React.useState(true);
  const [week, setWeek] = React.useState({
    sunday:false,
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false
  });

  const handleCheck = (e) => {
    setWeek({
      ...week,
      [e.target.name]: e.target.checked,
    });
  };

  const theme = createTheme({
    overrides: {
      MuiFormControl: {
        root: {
          width: "100%"
        }
      },
      MuiInputBase: {
        input: {
          border: "1px solid #c5c5c5 ",
          borderRadius: 4,
          padding: 4,
        },
        inputMultiline: {
          padding: 16,
          height: "1.1876em !important",
        },
        multiline :{
          paddingTop: 4,
          paddingBottom: 0,
        }
      },
      MuiInputLabel: {
        formControl: {
          padding: 6
        }
      }
    },
  });

  const showFrequency = () => {
    switch(frequency){
      case 'único':
        return (
          <FormControl 
            margin="normal"
            fullWidth={true}
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate)
                }}
                renderInput={(props) => ( <TextField {...props} /> )}
              />
            </LocalizationProvider>
          </FormControl>
        )
      case 'semanal':
        return (
          <FormControl 
            margin="normal"
            fullWidth={true}
            >
            <FormLabel component="legend">Dia da semana</FormLabel>
            <FormGroup row >
              <FormControlLabel
                control={
                  <Checkbox checked={week.sunday} onChange={handleCheck} name="sunday" />
                }
                label="Domingo"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.monday} onChange={handleCheck} name="monday" />
                }
                label="2ª"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.tuesday} onChange={handleCheck} name="tuesday" />
                }
                label="3ª"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.wednesday} onChange={handleCheck} name="wednesday" />
                }
                label="4ª"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.thursday} onChange={handleCheck} name="thursday" />
                }
                label="5ª"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.friday} onChange={handleCheck} name="friday" />
                }
                label="6ª"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={week.saturday} onChange={handleCheck} name="saturday" />
                }
                label="Sábado"
              />
            </FormGroup>
          </FormControl>
        )
      case 'mensal':
        return(
          <div>
            <FormControl 
              margin="normal"
              fullWidth={true}
              >
              <InputLabel id="todo-label"> {gender?'Todo':'Toda'} </InputLabel>
              <Select
                {...register("todo")} 
                id="todo"
                labelId="todo-label"
                label={gender?'Todo':'Toda'}
                disableUnderline={true}
                // defaultValue="1"
                placeholder="Todo(a)"
              >
                <MenuItem value="1">{gender?'Primeiro':'Primeira'}</MenuItem>
                <MenuItem value="2">{gender?'Segundo':'Segunda'}</MenuItem>
                <MenuItem value="3">{gender?'Terceiro':'Terceira'}</MenuItem>
                <MenuItem value="4">{gender?'Último':'Última'}</MenuItem>
              </Select>
            </FormControl>
            <FormControl 
              margin="dense"
              fullWidth={true}
            >
              <InputLabel id="month-label"> Dia da semana</InputLabel>
              <Select
                {...register("month")} 
                id="month"
                labelId="month-label"
                label="Dia da semana"
                // defaultValue="domingo"
                disableUnderline={true}
                onChange={(e) => setGender(e.target.value.at(-1) === 'o')}
              >
                <MenuItem value="sunday">Domingo do mes</MenuItem>
                <MenuItem value="monday">Segunda do mes</MenuItem>
                <MenuItem value="tuesday">Terça do mes</MenuItem>
                <MenuItem value="wednesday">Quarta do mes</MenuItem>
                <MenuItem value="thursday">Quinta do mes</MenuItem>
                <MenuItem value="friday">Sexta do mes</MenuItem>
                <MenuItem value="saturday">Sábado do mes</MenuItem>
              </Select>
            </FormControl>
          </div>
        )
      default:
        return <></>
    }
  }
  
  const onSubmit = (body) => {
    body.week = week
    body.time = moment(time).format('H:m')
    if(date) 
      body.date = moment(date).format('D/M/YYYY')
    api.post(url, body)
    .then((r) =>{
      console.log(r)
    })
    .catch((e) => console.log(e))
    .finally(() => props.returnClick())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <ThemeProvider theme={theme}>
      <FormControl 
        margin="normal"
        fullWidth={true}
        >
        <TextField 
          label="Nome"
          {...register("name", {required: true })} 
          id="name" 
          type="text"
          multiline={true}
          disableUnderline={true} />
        {errors.name && <span >Preencha este campo</span>}
      </FormControl>

      <FormControl 
        margin="normal"
        fullWidth={true}
        >
        <InputLabel id="frequency-label">
          Frequência  
        </InputLabel>
        <Select
          {...register("frequencia", {required: true })} 
          id="frequency"
          labelId="frequency-label"
          label="Frequência"
          disableUnderline={true}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <MenuItem value="único">Único</MenuItem>
          <MenuItem value="semanal">Semanal</MenuItem>
          <MenuItem value="mensal">Mensal</MenuItem>
        </Select>
        {errors.frequency && <span >Preencha este campo</span>}
      </FormControl>

      {showFrequency()}

      <FormControl 
        margin="normal"
        fullWidth={true}
        >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Hora"
            value={time}
            onChange={(newTime) => {
              setTime(newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl
        margin="normal"
        variant="filled"
        fullWidth={true}
        >
        <TextField 
          label="Descrição"
          {...register("description")} 
          id="description"
          type="text"
          // multiline={true}
          disableUnderline={true} />
      </FormControl>
      <input 
        {...register("latitude", { required: true, value: props.latitude })} 
        value={props.latitude}
        id="latitude"
        type="number"
        hidden />

      <input 
        {...register("longitude", { required: true, value: props.longitude })} 
        value={props.longitude}
        id="longitude"
        type="number"
        hidden />

      <input 
        {...register("userId", { required: true })} 
        value={1}
        id="userId"
        type="number"
        hidden />

      <Button 
        type="submit"
        color="secondary"
        variant="contained" 
        fullWidth={true}
      >
        Enviar
      </Button>
      </ThemeProvider>
    </form>
  );
}