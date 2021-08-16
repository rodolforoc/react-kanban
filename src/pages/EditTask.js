import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

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

export default function EditTask() {
  const classes = useStyles();
  const [task, setTask] = useState({});
  let { id } = useParams();

  useEffect(() => {
    async function loadTask() {
      const response = await api.get(`/assignment/id`, { data: {
        param: 10
      }});
      console.log(response.data);
      setTask(response.data);
    }
    
    loadTask();
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Edit />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Tarefa
        </Typography>
        <div className={classes.form}>
          <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Título"
            name="titulo"
            autoFocus
          />
          <TextField
            variant="outlined"
            id="outlined-textarea"
            fullWidth
            required
            label="Descrição"
            placeholder="Descricao"
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="complexidade"
            label="Complexidade"
            id="complexidade"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="desenvolvedor"
            label="Desenvolvedor"
            id="desenvolvedor"
          />
          <TextField
            id="date"
            label="Data Início"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
                marginRight: 30
            }}
          />
          <TextField
            id="date"
            label="Data Término"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Editar
          </Button>
        </div>
      </div>
    </Container>
  );
}