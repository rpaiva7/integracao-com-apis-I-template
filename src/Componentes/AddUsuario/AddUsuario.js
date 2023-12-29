import React, { useState } from "react";
import axios from "axios";

export default AddUsuario;

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  //Função para criar novo usuário chamando a APi
  const criarUsuario = (name, email) => {
    const headers = {
      headers: {
        Authorization: "renan-paiva-barbosab"
      }
  }

  const body = {
    name, 
    email
  }

  axios.post("https://labenusers.onrender.com/labenusers/users", body, headers)
  .then((resposta) => {
    alert("Pessoa adicionada com sucesso!") //Mostra essa mensagem na tela 
    setNome("") //limpa automaticamente os dados do campo nome
    setEmail("") //limpa automaticamente os dados do campo email
    props.pegarTodosOsUsuarios() //Insere o nome e email digitados sem precisar atualizar a página. Já tenho essa função escrita na pasta/componente APP, não preciso refazê-la, somente enviar para cá via props
  })
  .catch((erro) => {
    console.log(erro)
  })
  }

  return (
    <>
      <h3>Adicionar novo usuario</h3>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={()=> criarUsuario(nome, email)}>Enviar</button>
    </>
  )
      }
