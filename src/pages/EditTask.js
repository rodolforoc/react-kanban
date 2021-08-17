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

export default function EditTask() {
  let { id } = useParams();
  const classes = useStyles();
  const [idTask, setIdTask] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [complexidade, setComplexidade] = useState(1);
  const [dev, setDev] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtFim, setDtFim] = useState('');

  useEffect(() => {
    async function loadTask() {
      const response = await api.get(`/assignment/${id}`);
      const taskResponse = response.data;
      
      setIdTask(taskResponse.id);
      setTitulo(taskResponse.titulo);
      setDescricao(taskResponse.descricao);
      setComplexidade(taskResponse.complexidade);
      setDev(taskResponse.desenvolvedor);
      setResponsavel(taskResponse.responsavel);
      setDtInicio(taskResponse.dataInicio);
      setDtFim(taskResponse.dataTermino);
    }
    
    loadTask();
  }, []);

  function handleChangeTitulo(event) {
    setTitulo(event.target.value);
  }

  function handleChangeDescricao(event) {
    setDescricao(event.target.value);
  }

  function handleChangeDev(event) {
    setDev(event.target.value);
  }

  function handleChangeResponsavel(event) {
    setResponsavel(event.target.value);

  }

  function handleChangeDtInicio(event) {
    setDtInicio(event.target.value);
  }

  function handleChangeDtFim(event) {
    setDtFim(event.target.value);
  }

  function handleUpdateTask() {
    let payload = {
      "id": idTask,
      "titulo": titulo,
      "descricao": descricao,
      "complexidade": complexidade,
      "responsavel": responsavel,
      "desenvolvedor": dev,
      "dataInicio": dtInicio,
      "dataTermino": dtFim
    }

    function goBack() {
      history.replace('/board');
    }

    api.patch('/assignment', payload);
    setTimeout(goBack, 1500);
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
              value={titulo}
              onChange={handleChangeTitulo}
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
              value={descricao}
              onChange={handleChangeDescricao}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="complexidade"
              label="Complexidade"
              id="complexidade"
              value={complexidade}
              inputProps={
                { readOnly: true, }
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="desenvolvedor"
              label="Desenvolvedor"
              id="desenvolvedor"
              value={dev}
              onChange={handleChangeDev}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="responsavel"
              label="Responsavel"
              id="responsavel"
              value={responsavel}
              onChange={handleChangeResponsavel}
            />
            <TextField
              id="date"
              label="Data Início"
              type="date"
              className={classes.textField}
              value={dtInicio}
              onChange={handleChangeDtInicio}
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
              className={classes.textField}
              value={dtFim}
              onChange={handleChangeDtFim}
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
              onClick={handleUpdateTask}
            >
              Editar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}