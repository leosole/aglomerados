import React from 'react'
import { Drawer, Typography } from '@mui/material';
import { Button, CardActions, CardContent, Card, IconButton  } from "@material-ui/core";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShowReviews from './ShowReviews';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share"
import {useLocation} from 'react-router-dom'


export default function AglomeracaoDrawer({info, ...props}){
    var finalLetter = null
    var littleLetter = null
    var monthlyOptions = null
    var query = useLocation()
    const url = 'localhost:3000/'+query.search

    if(info.frequency.monthWeekDay){
      finalLetter = info.frequency.monthWeekDay.at(0) === 's' ? 'o' : 'a'
      littleLetter = info.frequency.monthWeekDay.at(0) === 's' ? 'º' : 'ª'
      monthlyOptions = ['1'+littleLetter, '2'+littleLetter, '3'+littleLetter, 'últim'+finalLetter]
    }
    const weekOptions = {
      sunday: 'domingo',
      monday: 'segunda',
      tuesday: 'terça',
      wednesday: 'quarta',
      thursday: 'quinta',
      friday: 'sexta',
      saturday: 'sábado'
    }
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
                <Typography variant="h5" >{info.name}</Typography>
                <Card elevation={0} >
                    <CardContent>
                    {
                        info.dateString &&
                        <div>
                        <Typography variant="body2" component="p">
                            Data
                        </Typography>
                        <Typography color="textSecondary">
                            {info.dateString}
                        </Typography>
                        </div>
                    }
                    {
                        info.frequencyType === 'semanal' &&
                        <div>
                        <Typography variant="body2" component="p">
                            Toda semana
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {info.frequency.sunday && <Chip label="Domingo" color="secondary" variant="outlined" />}
                            {info.frequency.monday && <Chip label="Segunda" color="secondary" variant="outlined" />}
                            {info.frequency.tuesday && <Chip label="Terça" color="secondary" variant="outlined" />}
                            {info.frequency.wednesday && <Chip label="Quarta" color="secondary" variant="outlined" />}
                            {info.frequency.thursday && <Chip label="Quinta" color="secondary" variant="outlined" />}
                            {info.frequency.friday && <Chip label="Sexta" color="secondary" variant="outlined" />}
                            {info.frequency.saturday && <Chip label="Sábado" color="secondary" variant="outlined" />}
                        </Stack>
                        </div>
                    }
                    {
                        info.frequency.monthWeek &&
                        <Chip 
                            color="secondary"
                            variant="outlined"
                            label={`Tod${finalLetter} ${monthlyOptions[info.frequency.monthWeek]} ${weekOptions[info.frequency.monthWeekDay]} do mes`}  
                        />
                    }
                    <Typography variant="body2" component="p">
                        Hora
                    </Typography>
                    <Typography color="textSecondary">
                        {info.time}
                    </Typography>
                        {info.info.map((i, n) => (
                            i.value &&
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
                        <TwitterShareButton title={info.name} url={url}> 
                            <TwitterIcon size={24} round/> 
                        </TwitterShareButton>
                        <WhatsappShareButton title={info.name} url={url}> 
                            <WhatsappIcon size={24} round/> 
                        </WhatsappShareButton>
                    </CardActions>
                </Card>
                <ShowReviews
                    user={props.user}
                />
            </Drawer>
        </ThemeProvider>
    )
}