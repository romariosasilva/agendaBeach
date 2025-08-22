// CRUD de torneios
const form		= document.getElementById("formTorneio");
const lista		= document.getElementById("listaTorneios");
let torneios	= [];

if(form)
{
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const torneio = {
			nome: form.nome.value,
			categoria: form.categoria.value,
			nivel: form.nivel.value,
			data: form.data.value,
			horario: form.horario.value,
			valor: form.valor.value,
			endereco: `${form.rua.value}, ${form.bairro.value}, ${form.cidade.value} - ${form.estado.value}`,
			link: form.link.value,
		};

		torneios.push(torneio);
		atualizarLista();
		form.reset();
	});

	document.getElementById("cep").addEventListener("blur", function () {
		const cep = this.value.replace(/\D/g, "");
		if (cep.length === 8) {
			fetch(`https://viacep.com.br/ws/${cep}/json/`)
				.then(response => response.json())
				.then(data => {
					if (!data.erro) {
						form.rua.value = data.logradouro;
						form.bairro.value = data.bairro;
						form.cidade.value = data.localidade;
						form.estado.value = data.uf;
					} else {
						alert("CEP não encontrado!");
					}
				})
				.catch(() => alert("Erro ao buscar CEP"));
		}
	});
}

function atualizarLista() {
	lista.innerHTML = "";
	torneios.forEach((t, index) => {
		const li = document.createElement("li");
		li.innerHTML = `
			<strong>${t.nome}</strong><br>
			Categoria: ${t.categoria}, Nível: ${t.nivel}<br>
			Data: ${t.data}, Horário: ${t.horario}<br>
			Valor: R$ ${t.valor}<br>
			Local: ${t.endereco}<br>
			<a href="${t.link}" target="_blank">Acessar Torneio</a><br>
			<button onclick="removerTorneio(${index})">Remover</button>
		`;
		lista.appendChild(li);
	});
}

function removerTorneio(index) {
	torneios.splice(index, 1);
	atualizarLista();
}





// Inicializa o Firebase com a configuração do projeto
// const firebaseConfig = {
// 	apiKey: "sua-api-key",
// 	authDomain: "seu-auth-domain",
// 	projectId: "seu-project-id",
// 	storageBucket: "seu-storage-bucket",
// 	messagingSenderId: "seu-messaging-sender-id",
// 	appId: "seu-app-id",
// };

// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const firestore = firebase.firestore();

// // Adiciona um novo torneio no Firestore
// function adicionarTorneio(torneio) {
// 	firestore.collection('torneios').add(torneio)
// 		.then(() => {
// 			alert("Torneio adicionado com sucesso!");
// 			carregarTorneios();
// 		})
// 		.catch((error) => {
// 			console.error("Erro ao adicionar torneio:", error);
// 		});
// }

// Carrega os torneios do Firestore
// function carregarTorneios() {
// 	firestore.collection('torneios').get().then((snapshot) => {
// 		const lista = document.getElementById('listaTorneios');
// 		lista.innerHTML = ''; // Limpa a lista antes de atualizar

// 		snapshot.forEach(doc => {
// 			const torneio = doc.data();
// 			const li = document.createElement('li');
// 			li.innerHTML = `
// 				<strong>${torneio.nome}</strong><br>
// 				Categoria: ${torneio.categoria}, Nível: ${torneio.nivel}<br>
// 				Data: ${torneio.data}, Horário: ${torneio.horario}<br>
// 				Valor: R$ ${torneio.valor}<br>
// 				Local: ${torneio.endereco}<br>
// 				<a href="${torneio.link}" target="_blank">Acessar Torneio</a><br>
// 			`;
// 			lista.appendChild(li);
// 		});
// 	});
// }

// Autenticação do usuário
// document.getElementById('login-form').addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const usuario = e.target[0].value;
// 	const senha = e.target[1].value;
// 	auth.signInWithEmailAndPassword(usuario, senha)
// 		.then(() => {
// 			alert("Login bem-sucedido!");
// 			window.location.href = 'torneios.html'; // Redireciona para a página de torneios
// 		})
// 		.catch((error) => {
// 			alert("Erro no login: " + error.message);
// 		});
// });

// document.getElementById('cadastro-form').addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const usuario = e.target[0].value;
// 	const senha = e.target[1].value;
// 	auth.createUserWithEmailAndPassword(usuario, senha)
// 		.then(() => {
// 			alert("Cadastro bem-sucedido!");
// 			window.location.href = 'torneios.html'; // Redireciona para a página de torneios
// 		})
// 		.catch((error) => {
// 			alert("Erro no cadastro: " + error.message);
// 		});
// });

// Deslogar usuário
function deslogar() {
	auth.signOut().then(() => {
		window.location.href = 'index.html'; // Redireciona para a página de login
	}).catch((error) => {
		console.error("Erro ao deslogar:", error);
	});
}