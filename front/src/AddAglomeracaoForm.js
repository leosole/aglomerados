import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles({
  error: {
    color: "red",
    fontSize: "0.8em"
  },
  button: {
    marginTop: "20px"
  },
  form: {
    minHeight: 200
  }
});
export default function AddAglomeracaoForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const classes = useStyles();
  // console.log(watch("name")); 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <FormControl>
        <InputLabel htmlFor="name">Nome</InputLabel>
        <Input 
          {...register("name", {required: true })} 
          id="name" 
          type="text" />
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
          rows={2}
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
    </form>
  );
}