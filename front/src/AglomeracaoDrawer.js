import React from 'react'
import { Drawer, Typography } from '@mui/material';
import { Button, CardActions, CardContent, Card, IconButton  } from "@material-ui/core";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShowReviews from './ShowReviews';

export default function AglomeracaoDrawer(props){

    const theme = createTheme({
        typography: {
            h5: {
                textAlign: 'center',
                fontFamily: ['Capriola', 'sans-serif'].join(','),
                fontWeight: 'bold',
            }
        },
        components: {
            MuiPaper: {
                styleOverrides:{
                    root: {
                        minWidth: 400,
                        maxWidth: '30vw',
                        padding: 32  
                    }
                }
            },
        },
    })

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.setIsAglomeracaoDrawerOpen(false)
    }

    const handleDrawerClose = () => props.setIsAglomeracaoDrawerOpen(false)


    return (
        <ThemeProvider theme={theme}>
            <Drawer
                anchor="right"
                open={props.isOpen}
                onClose={toggleDrawer}
            >   
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon fontSize="large"/>
                    </IconButton>
                </DrawerHeader>
                <Typography variant="h5" >{props.name}</Typography>
                <Card elevation={0} >
                    <CardContent>
                    {props.info.map((i, n) => (
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
                        <Button size="small">Compartilhar</Button>
                    </CardActions>
                </Card>
                <ShowReviews
                    user={props.user}
                />
            </Drawer>
        </ThemeProvider>
    )
}