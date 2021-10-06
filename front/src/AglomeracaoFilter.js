import React from 'react'
import { DateRange } from 'react-date-range'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment'
import { useForm } from "react-hook-form";
import DateRangeIcon from '@material-ui/icons/DateRange'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Box } from '@mui/system'



export default function AglomeracaoFilter (props) {
    const { register, handleSubmit } = useForm()
    // const [startDate, setStartDate] = React.useState(new Date())
    // const [endDate, setEndDate] = React.useState(null)
    const [state, setState] = React.useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
    ])
    const [startTime, setStartTime] = React.useState(null)
    const [endTime, setEndTime] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null)
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSubmit = (e) => {
        props.handleFilter(e)
        handleClose()
    }

    const handleClean = () => {
        setState([{
            startDate: null,
            endDate: null,
            key: 'selection'
        }])
        setStartTime(null)
        setEndTime(null)
        props.handleClean()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div>
            <Button aria-describedby={id} onClick={handleClick}>
                <DateRangeIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                /> 
                <Box sx={{width:352}} alignContent='center' display='flex'>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <TimePicker
                            label="De"
                            ampm={false}
                            value={startTime}
                            onChange={(newTime) => {
                                setStartTime(newTime)
                            }}
                            renderInput={(params) => <TextField {...params} sx={{width:'40%', marginLeft:3}}/>}
                            views={['hours']}
                            inputFormat="HH:mm"
                        />
                        <TimePicker
                            label="Até"
                            ampm={false}
                            value={endTime}
                            onChange={(newTime) => {
                                setEndTime(newTime)
                            }}
                            renderInput={(params) => <TextField {...params} sx={{width:'40%', marginRight:3, marginLeft:2}}/>}
                            views={['hours']}
                            inputFormat="HH:mm"
                        />
                    </LocalizationProvider>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input id="startDate" hidden readOnly {...register("startDate", {value: state[0].startDate})}/>
                    <input id="endDate" hidden readOnly {...register("endDate", {value: state[0].endDate})}/>
                    <input id="startTime" hidden readOnly {...register("startTime", {value: startTime})}/>
                    <input id="endTime" hidden readOnly {...register("endTime", {value: endTime})}/>
                    <Button 
                        color="warning"
                        onClick={handleClean} 
                        sx={{width: '50%'}}
                    >
                        Limpar
                    </Button>
                    <Button 
                        // onClick={() => handleFilter()} 
                        type="submit"
                        // color="secondary"
                        // variant="contained" 
                        sx={{width: '50%'}}
                    >
                        Filtrar
                    </Button>
                </form>
            </Popover>
        </div>
    )
}