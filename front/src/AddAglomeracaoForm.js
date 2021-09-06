import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import api from "./api";

const url = '/gatherings';

const useStyles = makeStyles({
  error: {
    color: "red",
    fontSize: "0.8em"
  },
  button: {
    marginTop: "20px"
  },
});

export default function AddAglomeracaoForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const classes = useStyles();
   
  const theme = createTheme({
    overrides: {
      MuiFormControl: {
        root: {
          width: "100%"
        }
      },
      MuiInputBase: {
        input: {
          border: "1px solid #c5c5c5 !important",
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
  
  const onSubmit = (body) => {
    console.log(body)
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
      <FormControl>
        <InputLabel htmlFor="name">
          Nome
        </InputLabel>
        <Input 
          {...register("name", {required: true })} 
          id="name" 
          type="text"
          multiline={true}
          disableUnderline={true} />
        {errors.name && <span className={classes.error}>Preencha este campo</span>}
      </FormControl>
      <br></br>
      <FormControl>
        <InputLabel htmlFor="description">Descrição</InputLabel>
        <Input 
          {...register("description")} 
          id="description"
          type="text"
          multiline={true}
          maxRows={10}
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

      <br></br>
      <Button 
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained" 
        fullWidth={true}
      >
        Enviar
      </Button>
      </ThemeProvider>
    </form>
  );
}