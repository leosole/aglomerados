import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     fontFamily: ['Capriola', 'sans-serif'],
//     fontWeight: 'bold',
//   },
// }));
const theme = createTheme({
  typography: {
    fontFamily: ['Capriola', 'sans-serif'].join(','),
    fontWeight: 'bold'
  },
});


export default function Header() {
  // const classes = useStyles();

  return (
    <ThemeProvider theme={theme}> 
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            aglomerados
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}