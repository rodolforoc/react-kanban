import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CasinoIcon from '@material-ui/icons/Casino';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import { Context } from '../Context/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Planning({ name="teste" }) {
  const classes = useStyles();
  const { authenticated, handleLogin } = useContext(Context);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CasinoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Planning da Tarefa
        </Typography>
        <TextField 
          type='text' 
          defaultValue={name}
          variant='outlined'
          inputProps={
            { readOnly: true, }
          }
          style={{
            marginBottom: '15px'
          }}
        />
        <div>
          <button > 1 </button>
          <button > 2 </button>
          <button > 3 </button>
          <button > 5 </button>
          <button > 8 </button>
          <button > 13 </button>
        </div>
      </div>
    </Container>
  );
}