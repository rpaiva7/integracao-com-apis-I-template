import React, { useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios"
import { useEffect } from "react";

function App(){

  const [usuarios, setUsuarios] = useState([])

  const pegarTodosOsUsuarios = () => {
    const headers = {
      headers: {
        Authorization: "renan-paiva-barbosab"
      }
    }
    axios.get("https://labenusers.onrender.com/labenusers/users", headers )
    .then((resposta)=> {
      setUsuarios(resposta.data) //colocando para renderizar na tela
      console.log(resposta.data); //Nunca deixar o console.log no código, pode mostrar dados sensíveis do usuário
    })
    .catch((erro)=> {
      console.log(erro)
    })
  }

  useEffect(()=> {
    pegarTodosOsUsuarios()
  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario pegarTodosOsUsuarios={pegarTodosOsUsuarios} />
      <hr/>
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} id={usuario.id} />
      })}
    </>
  )
}

export default App;


//Chamamos a API dentro do useEffect sempre que quisermos que o conteúdo da API seja renderizado instantaneamente na página. 

// API é um conjunto de endpoints.

// Endpoint conecta o usuário ao banco de dados. É como se fosse uma ponte ou um serviço que conecta o usuário ao banco de dados.

// O header (authorization) é uma senha que me autoriza a acessar a API. 

// O link que passo no axios é um endpoint. Através desse endpoint é possível manipular o banco de dados. Por exemplo pegar, adicionar, atualizar ou deletar informações da API que estou consumindo.

// O header é o cabeçalho do endpoint. Algumas API's são privadas, nesses casos eu preciso fazer um "login" nessas API's, e isso é feito através do header (authorization: senha).

// API's públicas não exigem um header (login) para manipular o endpoint. 

// Quem cria endpoint e a documentação no postman é o backend. O Axios é só uma forma do frontend consumir os dados do endpoint. O Axios facilita a requisição e melhora a resposta da API. Se formos escrever uma função sem o axios seria uma função gigante. 
// _______________________________


/* Requisições 

# Requisições em Javascript

### **axios**

- **Biblioteca** para fazer requisições
- "Igual" ao Postman, só que dentro do código
- Existem formas nativas (sem bibliotecas), mas o *axios* facilita várias coisas para nós

Instalação:
Comando:  npm install axios

Sintaxe:
import axios from 'axios'

axios.metodo('https://minha-api.com', {
	headers: {
		"Authorization": 'nome-sobrenome-turma'
	}
})

Exemplo com o método get:
axios.get('https://minha-api.com', {
	headers: {
		"Authorization": 'nome-sobrenome-turma'
	}
})

O axios aceita todos os métodos HTTP (GET, POST, PUT, DELETE)

A sintaxe em si não muda, apenas os parâmetros necessários (por exemplo: se há ou não dados a serem enviados naquele endpoint específico que estamos usando).

Problemas:

- E se a requisição demorar muito?
    - Devemos parar a execução do código? NÃO
    - E se der erro na requisição?
    - Parâmetros errados
    - Servidor com problema
    - Usuário sem internet

Tempo de Requisição:

- Não temos controle sobre o tempo da requisição
- Não queremos que a aplicação fique travada enquanto esperamos
- Javascript criou uma solução: assincronicidade
- Resolve o problema da requisição sem parar o código enquanto espera a resposta;

Sincronicidade:

- Normalmente, o código é executado linha após linha
- Quando uma função é chamada, o código aguarda a execução dela para prosseguir

Assincronicidade:

- Podemos fazer com que o Javascript execute funções demoradas de forma assíncrona
- A diferença é que o código não espera sua conclusão para prosseguir
- Nova estrutura nos permite lidar com isso de forma mais intuitiva: Promises
- Qualquer requisição feita pelo axios será assíncrona por padrão.

Promises:

Promise é um objeto nativo (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects) do javascript que representa algo que ainda não existe, mas se tornará uma conclusão (resposta) ou falha (erro) na execução de uma função assíncrona.

Ela funciona como uma “promessa” do javascript que, em algum momento, terá uma resposta. 

Temos alguns métodos para trabalhar as promises, como o .then() e .catch() que serão explicados a seguir.

Recebendo respostas com o .then():

Usamos o método .then() para acessar e trabalhar as respostas que recebemos na promise. Ele recebe uma função de callback como parâmetro:

.then((resposta) =>{
	//o que acontece com a resposta
	console.log(resposta)
})

Para trabalhar com promises, chamamos a variável que guarda a requisição com a função .then():

import axios from 'axios'

const request = axios.get('https://minha-api.com', {
	headers: {
		"Content-Type": 'application',
		"Authorization": 'nome-sobrenome-turma'
	}
})

request.then((resposta) => {
	console.log(resposta.data)
})

Tratando erros com .catch():

- Até agora, trabalhamos somente com dados e códigos criados por nós, então todos os erros eram responsabilidade nossa!
- Quando usamos integrações externas, estamos sujeitos a erros que fogem do nosso controle e precisamos tratar esse erro para que nossa aplicação não pare de funcionar.
- Para isso, depois de todos os .then(), colocamos um .catch(). Ele será responsável por receber os erros enviados pela API.

Quando não tratamos os erros, o código não trará uma alteração e assim o usuário não saberá o que está impedindo a execução da página, dando a impressão que o problema está no código em si e não na requisição.

Por exemplo: Um erro comum é de senha incorreta ou usuário incorreto. Se não recebemos este erro e exibimos ao usuário, este não tentará novamente com outro email/senha.

- A sintaxe do .catch() é bastante similar à sintaxe do .then(), recebe como parâmetro uma função de callback que retornará o erro caso aconteça.
    - Com uma observação a mais: diferente do que ocorre no .then() em que conseguimos acessar a resposta apenas com o parâmetro criado na função de callback, no .catch() precisamos adicionar um .response ao final, para acessar a resposta do erro.

    .catch((erro)=>{
//para acessar o erro, por padrão, precisamos do .response
	console.log(erro.response)
})

import axios from 'axios'

const request = axios.get('https://minha-api.com', {
	headers: {
		"Content-Type": 'application',
		"Authorization": 'nome-sobrenome-turma'
	}
})

request.then((response) => {
	console.log(response.data)
}).catch((erro) => {
	console.log(erro.response)
})

Sintaxe sem body:

import axios from 'axios'

axios.get('https://minha-api.com', {
	headers: {
		"Content-Type": 'application',
		"Authorization": 'nome-sobrenome-turma'
	}
}).then((response) => {
//resposta em caso de sucesso
	console.log(response)
}).catch((error) => {
//resposta em caso de erro
	console.log(error.response)
})

Sintaxe com body:

import axios from 'axios'

const body = {
	name: "Bob",
	email: "bob@gmail.com"
}

axios.post('https://minha-api.com', body, {
	headers: {
		"Authorization": 'nome-sobrenome-turma'
	}
}).then((response) => {
//resposta em caso de sucesso
	console.log(response)
}).catch((error) => {
//resposta em caso de erro
	console.log(error.response)
})

Normalmente os endpoints que irão solicitar um body serão os endpoints de adicionar (POST) ou modificar (PUT) dados, não sendo muito comum o envio de dados em requisições GET.

OBSERVAÇÃO: Apesar da API geralmente esperar que seja enviado um JSON, quando usamos o axios, criamos o body em formato de objeto, pois o axios já “traduz” o objeto para JSON na hora de enviar a requisição.

Resumo:

1. Axios é uma biblioteca para fazer requisições e é semelhante ao Postman;
2. A assincronicidade é uma solução para lidar com o tempo de requisição sem parar o código.
3. As promises são objetos nativos do JavaScript que representam algo que ainda não existe, mas que em algum momento terá uma resposta;
4. O método `then` permite trabalhar com as respostas recebidas pela Promise, enquanto o `catch` é utilizado para tratar erros que possam surgir;
5. Não tratar erros em integrações externas pode gerar problemas de execução no código, além de dificultar a identificação do problema pelo usuário;


Requisições no React:

As requisições com o Axios no JavaScript são essencialmente iguais às requisições no React, uma vez que o Axios é uma biblioteca JavaScript que pode ser usada tanto no React quanto em outras plataformas.

Uma das principais diferenças é a forma como os dados são tratados e exibidos na interface do usuário. No JS puro pode ser necessário atualizar manualmente a interface do usuário após receber uma resposta da API. No react os dados são armazenaddos no ESTADO DA APLICAÇÃO, o que permite que a interface do usuário seja atualizada automaticamente quando os dados são atualizados. 

Buscando Dados:

- Em geral, buscamos dados para exibi-los na tela ou usá-los em alguma ação posterior.
- Após recuperar os dados, é preciso armazená-los em algum lugar para que possam ser acessados fora da requisição.
- Nesse caso, utilizamos o estado.

function App() {
	const [playlists, setPlaylists] = useState([])

	const buscarPlaylists = () => {
		axios.get("https://link-da-api", {
			headers: {
				Authorization: "nome-sobrenome-turma"
			}
		})
	.then(response => {
		setPlaylists(response.data.result.list)
	})
	.catch(error => {
		console.log(error.response)
	})
	return (<div></div>)
}

Buscando Dados Automaticamente:

- Frequentemente, queremos buscar e carregar os dados automaticamente assim que a tela carrega. Para isso, criamos a função e a chamamos dentro do useEffect. Outra opção seria criar a requisição em si dentro do próprio useEffect.
- Requisições para buscar dados(get) devem ser executadas depois da renderização dos componentes, pois não queremos que a tela fique travada enquanto a requisição é feita.
- Para isso, usamos o hook useEffect  useEffect(() =>{}, [])  com o array de dependências vazio para renderizar apenas na montagem do componente.

function App() {
	const [playlists, setPlaylists] = useState([])

	const buscarPlaylists = () => {
		axios.get("https://link-da-api", {
			headers: {
				Authorization: "nome-sobrenome-turma"
			}
		})
	.then(response => {
		setPlaylists(response.data.result.list)
	})
	.catch(error => {
		console.log(error.response)
	})

	useEffect(()=> {
		buscarPlaylists()
	}, [])

	return (<div></div>)
}

Enviando Dados:

- Requisições para enviar dados normalmente ocorrerão com base em um evento (ação do usuário).
- Frequentemente, mandaremos dados vindos de um formulário. Logo, precisamos captar o que o usuário digitou no input usando o evento onChange e salvar esse valor no estado.
- Por ultimo usamos os eventos, como onClick, para chamar a função responsável por fazer a requisição com o axios(criarPlaylist) passando os dados capturados no body.

function App() {
	const [nomeDaPlaylist, setNomeDaPlaylist] = useState("")

	const criarPlaylist = () => {
		const body = {
			name: "Rock"
		}

		axios.post("https://link-da-api", body, {
			headers: {
				Authorization: "nome-sobrenome-turma"
			}
		})
	.then(response => {
		console.log("Playlist criada!")
	})
	.catch(error => {
		console.log(error.response)
	})

	const onChangeInputValue = (event) => setNomeDaPlaylist(event.target.value)

	return (
		<>
			<input
				value={nomeDaPlaylist}
				onChange={onChangeInputValue}
			/>
			<button onClick={criarPlaylist}>Criar playlist</button>
		</>
	)
}

Resumo:

1. Requisições com o Axios no JavaScript são semelhantes às requisições no React.
2. No React, usamos o Axios para realizar solicitações HTTP para buscar ou enviar dados para um servidor.
3. No JavaScript puro, pode ser necessário atualizar manualmente a interface do usuário após receber uma resposta da API.
4. No React, os dados são armazenados no estado da aplicação, permitindo a atualização automática da interface do usuário quando os dados são atualizados.

*/
