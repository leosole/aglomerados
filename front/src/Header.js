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

  return (
    <ThemeProvider theme={theme}> 
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            aglomerados
          </Typography>
          <Button 
            color="inherit"
            onClick={props.openCreateProfileDrawer}
          >
            Cadastre-se
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}