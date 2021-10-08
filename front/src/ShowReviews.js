import React from 'react'
import { Typography, TextField, Button, Rating, FormControl } from '@mui/material'
import { useForm } from "react-hook-form";
import ReviewItem from './ReviewItem'

var reviews = [ // PARA TESTE
    { id:1, comment: 'teste 1,7 estrela', rating:1.7, user: 'Leo', date:'ontem' },
    { id:2, comment: 'teste 5 estrelas', rating:5, user: 'Leo', date:'ontem' }
]
export default function ShowReviews(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (body) => {
        console.log(body)
        // apiReviews.post(urlAglomeracao, body)
        // .then((r) =>{
        //   console.log(r)
        // })
        // .catch((e) => console.log(e))
        // .finally(() => props.returnClick())
    }

    const showInput = () => {
        return (
            props.user &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl 
                    margin="normal"
                    fullWidth={true}
                >
                    <Rating
                        {...register("rating", {required: true })} 
                        name="rating"
                        id="rating"
                        getLabelText={(value) => `${value} Estrela${value !== 1 ? 's' : ''}`}
                        precision={0.1}
                    />
                    <TextField 
                        label="Comentário"
                        {...register("comment", {required: true })} 
                        id="comment" 
                        type="text"
                        multiline={true}
                        disableUnderline={true} />
                    {errors.name && <span >Preencha este campo</span>}
                </FormControl>
                <input 
                    {...register("userID", { required: true, value: props.user.id })} 
                    value={props.user.id}
                    id="userID"
                    type="text"
                    hidden />
                <Button 
                    type="submit"
                    color="secondary"
                    variant="contained" 
                    fullWidth={true}
                >
                    Enviar
                </Button>
            </form>
        )
    }
    return (
        <div>
            <Typography variant="h6" component="h6" align="center">
                Comentários
            </Typography>
        {showInput()}    
        {
            reviews.map(({id, ...review}) => (
                <ReviewItem key={id} {...review}/>
            ))
        }
        </div>
    )
}