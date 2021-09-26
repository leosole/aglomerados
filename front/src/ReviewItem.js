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
    return (
        <ThemeProvider theme={theme}>
            <Card elevation={0} variant="outlined">
                <CardContent>
                <Rating
                    name="rating"
                    readOnly
                    value={props.rating}
                    getLabelText={(value) => `${value} Estrela${value !== 1 ? 's' : ''}`}
                    precision={0.05}
                />
                    <Typography variant="body" component="p">
                        {props.comment}
                    </Typography>
                    <Typography variant="body2" component="p" color="#999">
                        por {props.user}, em {props.date}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}