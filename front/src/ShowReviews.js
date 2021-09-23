import React from 'react'
import { Card, CardContent, Typography, StyledRating } from '@mui/material'
import ReviewItem from './ReviewItem'

var reviews = [ // PARA TESTE
    { id:1, comment: 'teste 1 coração', rating:1, user: 'Leo', date:'ontem' },
    { id:2, comment: 'teste 5 corações', rating:5, user: 'Leo', date:'ontem' }
]
export default function ShowReviews(props) {

    return (
        <div>
            <Typography variant="h6" component="h6" align="center">
                Comentários
            </Typography>
        {
            reviews.map(({id, ...review}) => (
                <ReviewItem key={id} {...review}/>
            ))
        }
        </div>
    )
}