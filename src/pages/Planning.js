import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CasinoIcon from '@material-ui/icons/Casino';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import history from '../history';

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

export default function Planning() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [vote, setVote] = useState(1);
  const [idTask, setIdTask] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get('/assignment');
      setTasks(response.data);
    }
    
    loadTasks();
  }, []);

  function handleTask(taskId, taskName) {
    setIdTask(taskId);
    setName(taskName);
  }

  function handleSubmitPlanning() {
    const currentTask = tasks.filter((task) => {
      if(task.id == idTask)
      return task;
    });

    let updatedTask = currentTask[0];
    updatedTask.complexidade = vote;
    api.patch(`/assignment`, updatedTask);
  }

  return (
    <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{
            marginBottom: '15px'
          }}
          onClick={() => history.push('/board')} >
          Voltar ao board
        </Button>
      <div style={{display: 'flex'}}>
        <Container maxWidth="xs">
          <Typography variant="h3" gutterBottom> 
            Tarefas
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
              {tasks.map((task) => {
                return (
                  <ListItem 
                    key={task.id}
                  > 
                    <ListItemIcon>
                      <ChevronRightIcon />
                    </ListItemIcon>
                    <Button 
                      onClick={() => handleTask(task.id, task.titulo)}
                      classes={{
                        root: classes.root,
                        label: classes.label, 
                      }}
                    >
                      {task.titulo}
                    </Button>
                  </ListItem>
                );
              })}
          </List>
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
            onClick={handleSubmitPlanning}
            >
              Confirmar
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}