import React from 'react'
import { Drawer, Typography } from '@mui/material';
import { Button, InputLabel, FormControl, TextField, FormLabel, FormGroup, IconButton  } from "@material-ui/core";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import api from './api';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
export default function LogInDrawer(props){

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
                <Typography variant="h5" >Log in</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <TextField 
                        margin="normal"
                        fullWidth={true}
                        label="Usuário"
                        {...register("user", {required: true })} 
                        id="user" 
                        type="text"
                        disableUnderline={true} />
                    {errors.user && <span >Preencha este campo</span>}

                    <TextField 
                        margin="normal"
                        fullWidth={true}
                        label="Senha"
                        {...register("password", {required: true })} 
                        id="password" 
                        type="password"
                        disableUnderline={true} />
                    {errors.password && <span >Preencha este campo</span>}

                    <Button 
                        type="submit"
                        color="secondary"
                        variant="contained" 
                        fullWidth={true}
                    >
                        Entrar
                    </Button>
                </form>
            </Drawer>
        </ThemeProvider>
    )
}