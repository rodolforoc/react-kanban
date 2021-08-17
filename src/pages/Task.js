import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddBox from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
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

export default function Task() {
  const classes = useStyles();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [complexidade, setComplexidade] = useState(1);
  const [dev, setDev] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [dtInicio, setDtInicio] = useState('2017-05-24');
  const [dtFim, setDtFim] = useState('2017-05-24');

  function handleChangeTitulo(event) {
    setTitulo(event.target.value);
  }

  function handleChangeDescricao(event) {
    setDescricao(event.target.value);
  }

  function handleChangeComplexidade(event) {
    setComplexidade(event.target.value);
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

  function handleNewTask() {

    let payload = {
      "titulo":  titulo,
      "descricao": descricao,
      "complexidade": parseInt(complexidade),
      "responsavel": parseInt(responsavel),
      "desenvolvedor": parseInt(dev),
      "dataInicio": dtInicio,
      "dataTermino": dtFim
    }

    api.post('/assignment', payload);
    history.push('/board');
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
            <AddBox />
          </Avatar>
          <Typography component="h1" variant="h5">
            Adicionar nova Tarefa
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
              onChange={handleChangeDescricao}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="complexidade"
              label="Complexidade"
              id="complexidade"
              onChange={handleChangeComplexidade}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="desenvolvedor"
              label="Desenvolvedor"
              id="desenvolvedor"
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
              onChange={handleChangeResponsavel}
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
              onChange={handleChangeDtInicio}
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
              onChange={handleChangeDtFim}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleNewTask}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}