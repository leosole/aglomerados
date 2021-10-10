import React from 'react'
import { Card, CardContent, Typography, Rating, Box } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides:{
                root: {
                    padding: '4px 8px',
                    marginTop:8 
                }
            }
        }
    },
})


export default function ReviewItem (props) {
    const getDate = (time) => {
        const present = new Date()
        const date = new Date(time)
        const passed = (present.getTime() - date.getTime())/(1000*60*60*24);
        console.log(passed)
        if(passed>=1){
            const days = Math.floor(passed);
            const plural = days === 1? ' dia':' dias';
            return 'a '+days+plural
        }
        if(passed*24>=1){
            const hours = Math.floor(passed*24);
            const plural = hours === 1? ' hora':' horas';
            return 'a '+hours+plural
        }
        else{
            const minutes = Math.floor(passed*60*24);
            const plural = minutes === 1? ' minuto':' minutos';
            return 'a '+minutes+plural
        }
    }
    console.log(props)
    return (
        <ThemeProvider theme={theme}>
            <Card elevation={0} variant="outlined">
                <CardContent>
                <Rating
                    name="rating"
                    readOnly
                    value={props.rating}
                    getLabelText={(value) => `${value} Estrela${value !== 1 ? 's' : ''}`}
                    precision={0.1}
                />
                    <Typography variant="body" component="p">
                        {props.comment}
                    </Typography>
                    <Typography variant="body2" component="p" color="#999">
                        por {props.userID}, {getDate(props.time)}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}