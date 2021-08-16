import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CasinoIcon from '@material-ui/icons/Casino';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';

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

export default function Planning({ nameDefault="teste" }) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [vote, setVote] = useState(1);
  const [name, setName] = useState(nameDefault);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get('/assignment');
      console.log(response.data);
      setTasks(response.data);
    }
    
    loadTasks();
  }, []);

  function handleTask(taskName) {
    setName(taskName);
  }

  return (
    <div style={{display: 'flex'}}>
      <Container maxWidth="xs">
        <div> Tarefas</div>
        <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <button onClick={() => handleTask(task.titulo)}>{task.titulo}</button>
                </li>
              );
            })}
        </ul>
      </Container>
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
            value={name}
            variant='outlined'
            inputProps={
              { readOnly: true, }
            }
            style={{
              marginBottom: '15px'
            }}
          />
          <div>
            <button onClick={() => setVote(1)}> 1 </button>
            <button onClick={() => setVote(2)}> 2 </button>
            <button onClick={() => setVote(3)}> 3 </button>
            <button onClick={() => setVote(5)}> 5 </button>
            <button onClick={() => setVote(8)}> 8 </button>
            <button onClick={() => setVote(13)}> 13 </button>
          </div>
          <div>
            Seu voto: {vote}
          </div>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          >
            Confirmar
          </Button>
        </div>
      </Container>
    </div>
  );
}