import React from 'react'
import { Drawer, Typography } from '@mui/material';
import { Button, InputLabel, FormControl, TextField, FormLabel, FormGroup, IconButton  } from "@material-ui/core";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import api from './api';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
export default function CreateProfileDrawer(props){

    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme({
        typography: {
            fontFamily: ['Capriola', 'sans-serif'].join(','),
            fontWeight: 'bold',
            h5: {
                textAlign: 'center'
            }
        },
        components: {
            MuiPaper: {
                styleOverrides:{
                    root: {
                        minWidth: '30%',
                        maxWidth: '980%',
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
        props.setIsCreateProfileOpen(false)
    }

    const handleDrawerClose = () => props.setIsCreateProfileOpen(false)

    const onSubmit = (body) => {
        console.log(body)
        // api.post(url, body)
        // .then((r) =>{
        //     console.log(r)
        // })
        // .catch((e) => console.log(e))
        // .finally(() => props.returnClick())
    }

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
                <Typography variant="h5" >Crie seu perfil</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
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
                        <TextField 
                            label="E-mail"
                            {...register("email", {required: true })} 
                            id="email" 
                            type="mail"
                            multiline={true}
                            disableUnderline={true} />
                        {errors.name && <span >Preencha este campo</span>}
                    </FormControl>

                    <Button 
                        type="submit"
                        color="primary"
                        variant="contained" 
                        fullWidth={true}
                    >
                        Enviar
                    </Button>
                </form>
            </Drawer>
        </ThemeProvider>
    )
}