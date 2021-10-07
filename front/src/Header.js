import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  typography: {
    fontFamily: ['Capriola', 'sans-serif'].join(','),
    fontWeight: 'bold',
    h6: {
      fontSize: 'inherit',
      position: 'fixed',
      paddingLeft: 8,
      lineHeight: 1.4
    }
  },
});

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 45,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 55,
  },
}));

export default function Header(props) {
  const [mobileView, setMobileView] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (click) => {
    handleClose()
    click()
  }

  React.useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    }
  }, []);
  const menuStyle = {textTransform:'uppercase', fontSize: '0.875rem'}

  const showMobile = (isLoggedIn) => (
    <div>
      <Button 
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{color:'#fff'}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          isLoggedIn ?
          <div>
            <MenuItem sx={{textTransform:'uppercase'}}>Perfil</MenuItem>
            <MenuItem onClick={() => handleMenuClick(props.logOff)} sx={menuStyle}>Sair</MenuItem>
          </div>
          :
          <div>
            <MenuItem onClick={() => handleMenuClick(props.openCreateProfileDrawer)} sx={menuStyle}>Cadastre-se</MenuItem>
            <MenuItem onClick={() => handleMenuClick(props.openLogInDrawer)} sx={menuStyle}>Log in</MenuItem>
          </div>
        }
        
      </Menu>
    </div>
  )

  const showDesktop = (isLoggedIn) => isLoggedIn?
  (
    <div>
      <Button 
        color="inherit"
        // onClick={props.openProfileDrawer}
      >
        Perfil
      </Button>
      <Button 
        color="inherit"
        onClick={props.logOff}
      >
        Sair
      </Button>
    </div>
  )
  :
  (
    <div>
      <Button 
        color="inherit"
        onClick={props.openCreateProfileDrawer}
      >
        Cadastre-se
      </Button>
      <Button 
        color="inherit"
        onClick={props.openLogInDrawer}
      >
        Log in
      </Button>
    </div>
  )

  const stroke = '6px 6px 0 #1976D2, 3px 6px 0 #1976D2, 0px 6px 0 #1976D2, -3px 6px 0 #1976D2, -6px 6px 0 #1976D2, 0px -6px 0 #1976D2, 0px -8px 0 #1976D2'
  const boxShadow = 'box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
  return (
    <ThemeProvider theme={theme}> 
      <Root>
        <Typography variant="h6" sx={{ textShadow: '0.5px 0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px -0.5px 0 #fff', color: '#fff', flexGrow: 1, zIndex: 1111 }}>
          aglomerados
        </Typography>
        <Typography variant="h6" sx={{ textShadow: stroke, boxShadow: boxShadow, flexGrow: 1, zIndex: 1110, color: '#1976D2'}}>
          aglomerados
        </Typography>
      </Root>
      
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{flexGrow:1}} />
          {mobileView ? showMobile(props.isLoggedIn) : showDesktop(props.isLoggedIn)}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}