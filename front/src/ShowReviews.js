import React from 'react'
import { Typography, TextField, Button, Rating, FormControl } from '@mui/material'
import { useForm } from "react-hook-form";
import ReviewItem from './ReviewItem'
import apiReviews from "./apiReviews";


const urlReviews = '/reviews'
export default function ShowReviews(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ reviews, setReviews ] = React.useState()
    const [ rating, setRating ] = React.useState(0)
    const [ comment, setComment ] = React.useState('')
    const [ update, setUpdate ] = React.useState(false)

    React.useEffect(() => {
        if(reviews) {
            const sum = reviews.reduce((acc, review) => acc += parseFloat(review.rating), 0)
            props.setRating(sum/reviews.length)
        }
    }, [reviews])

    React.useEffect(() => {
        apiReviews.get(urlReviews+'/?gatheringId='+props.aglomeracao)
        .then((r) =>{
            setReviews(r.data.reverse())
        })
        .catch((e) => console.log(e))
    },[update])

    const onSubmit = (body) => {
        apiReviews.post(urlReviews, body)
        .then((r) =>{
          setUpdate(!update)
          clearInput()
        })
        .catch((e) => console.log(e))
    }

    const clearInput = () => {
        setRating(0)
        setComment('')
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
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        getLabelText={(value) => `${value} Estrela${value !== 1 ? 's' : ''}`}
                        precision={0.2}
                    />
                    <TextField 
                        label="Comentário"
                        {...register("comment", {required: true })} 
                        id="comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
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
                <input 
                    {...register("gatheringId", { required: true, value: props.aglomeracao })} 
                    value={props.aglomeracao}
                    id="gatheringId"
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
        {   reviews &&
            reviews.map(({id, ...review}) => (
                <ReviewItem key={id} {...review}/>
            ))
        }
        </div>
    )
}