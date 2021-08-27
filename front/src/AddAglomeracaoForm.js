import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { compose, spacing, palette, styleFunctionSx } from '@material-ui/system';

const useStyles = makeStyles({
  error: {
    color: "red",
    fontSize: "0.8em"
  },
  button: {
    marginTop: "20px"
  },
});

const styleFunction = styleFunctionSx(compose(spacing, palette));

export default function AddAglomeracaoForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const classes = useStyles();
  // console.log(watch("name")); 
  const theme = createTheme({
    overrides: {
      MuiInputBase: {
        input: {
          border: "1px solid #c5c5c5 !important",
          borderRadius: 4,
          padding: 4
        },
        inputMultiline: {
          padding: 6,
          height: "1.1876em !important",
          width: "300px"
        },
        multiline :{
          paddingTop: 4,
          paddingBottom: 0
        }
      },
      MuiInputLabel: {
        formControl: {
          padding: 6
        }
      }
    },
  });
  
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
          // rows={1}
          // maxRows={2}
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
          rows={1}
          maxRows={10}
          disableUnderline={true}
        />
      </FormControl>
      <input 
        {...register("latitude", { required: true })} 
        value={props.latitude}
        id="latitude"
        type="number"
        hidden />

      <input 
        {...register("longitude", { required: true })} 
        value={props.longitude}
        id="longitude"
        type="number"
        hidden />
      <br></br>
      <Button 
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained" >
        Enviar
      </Button>
      </ThemeProvider>
    </form>
  );
}