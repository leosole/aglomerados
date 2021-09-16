import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const theme = createTheme({
  typography: {
    fontFamily: ['Capriola', 'sans-serif'].join(','),
    fontWeight: 'bold'
  },
});


export default function Header(props) {

  const showButtons = (isLoggedIn) => isLoggedIn?
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
        Login
      </Button>
    </div>
  )

  return (
    <ThemeProvider theme={theme}> 
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            aglomerados
          </Typography>
          {showButtons(props.isLoggedIn)}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}