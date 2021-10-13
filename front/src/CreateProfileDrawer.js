import React from 'react'
import { Drawer, Typography } from '@mui/material';
import { Button, TextField, IconButton  } from "@material-ui/core";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import apiUser from './apiUser';
export default function CreateProfileDrawer(props){
    const urlUser = 'auth/local/register'
    const { register, handleSubmit, formState: { errors } } = useForm();

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
                        maxWidth: '100vw',
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
        apiUser.post(urlUser, body)
        .then((r) => {
            console.log(r.data)
            props.setUser(r.data)
            props.logIn()
            props.setIsCreateProfileOpen(false)
        })
        .catch((e) => console.log(e))
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
                    <TextField 
                        margin="normal"
                        fullWidth={true}
                        label="Usuário"
                        {...register("username", {required: true })} 
                        id="username" 
                        type="text"
                        disableUnderline={true} />
                    {errors.name && <span >Preencha este campo</span>}

                    <TextField 
                        margin="normal"
                        fullWidth={true}
                        label="E-mail"
                        {...register("email", {required: true })} 
                        id="email" 
                        type="email"
                        disableUnderline={true} />
                    {errors.email && <span >Preencha este campo</span>}

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
                        Cadastrar
                    </Button>
                </form>
            </Drawer>
        </ThemeProvider>
    )
}