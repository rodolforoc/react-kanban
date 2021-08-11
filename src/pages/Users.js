import React, { useState, useEffect, useContext } from 'react';

import api from '../services/api';

import { Context } from '../Context/AuthContext';

export default function Users() {
  const { handleLogout } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.post('/assignment', {
        "id":1,
        "titulo":"Criação da página do jogo",
        "descricao":"Cria página assim, assim, assado",
        "complexidade":13,
        "responsavel":1,
        "desenvolvedor":2,
        "dataInicio":"2021-08-07",
        "dataTermino":"2021-09-03"
      }).then(function(response) {
        console.log(response)
      });

      setUsers(data);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.website})</li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}