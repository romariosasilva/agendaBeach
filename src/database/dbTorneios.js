import { db } from "./db.js";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

let tournamentsSnapshot = null;

//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES PARA ARMAZENAMENTO DE DADOS NA FIRESTORE
//
//
//----------------------------------------------------------------------------------------------------

// Carregar torneios
export async function loadTorneios() {
	const torneios = [];

	// if (tournamentsSnapshot) tournamentsSnapshot();

	const q = query( collection( db, 'torneios'), orderBy('data') )
	const tournamentsSnapshot = await getDocs(q);

	tournamentsSnapshot.forEach(doc => {
		const torneio = doc.data();
		torneios.push({
			id: doc.id,
			nome: torneio.nome,
			modalidade: torneio.modalidade,
			data: torneio.data,
			horario: torneio.hora
		});
	});

	return torneios;
}


// Criar torneio
export async function createTorneio(torneio) {
	let vStatus = '';
	let vMessage = '';

	// Salvar no localStorage
	await createTorneioFromLocalStorage(torneio);

	// Salvar no Firebase
	db.collection('torneios').add(torneio)
	.then(() => {
		vStatus = 'success';
		vMessage = 'Torneio cadastrado com sucesso!';
	})
	.catch(error => {
		vStatus = 'error';
		vMessage = error.message;
	});

	return {
		status: vStatus,
		message: vMessage
	};
}


// Excluir torneio
export async function deleteTorneio(id_torneio) {
	let vStatus = '';
	let vMessage = '';

	// Apagar do Firebase
	db.collection('torneios').doc(id_torneio).delete()
	.then(() => {
		vStatus = 'success';
		vMessage = 'Torneio excluído com sucesso!';
	})
	.catch(error => {
		vStatus = 'error';
		vMessage = error.message;
	});

	// Apagar do localStorage
	await deleteTorneioFromLocalStorage(id_torneio);

	return {
		status: vStatus,
		message: vMessage
	};
}





//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES PARA ARMAZENAMENTO DE DADOS LOCAL
//
//
//----------------------------------------------------------------------------------------------------

// Salva torneio no localStorage
async function createTorneioFromLocalStorage(torneio) {
	let torneios = JSON.parse(localStorage.getItem('torneios')) || [];
	torneios.push(torneio);
	localStorage.setItem('torneios', JSON.stringify(torneios));
}


// Carrega torneio do localStorage
async function getTorneioFromLocalStorage() {
	const torneios = JSON.parse(localStorage.getItem('torneios')) || [];
	const lista = document.getElementById('listaTorneios');
	lista.innerHTML = '';
	torneios.forEach(torneio => {
		const li = document.createElement('li');
		li.innerHTML = `
			<strong>${torneio.nome}</strong><br>
			Categoria: ${torneio.categoria}, Nível: ${torneio.nivel}<br>
			Data: ${torneio.data}, Horário: ${torneio.horario}<br>
			Valor: R$ ${torneio.valor}<br>
			Local: ${torneio.endereco}<br>
			<a href="${torneio.link}" target="_blank">Acessar Torneio</a><br>
		`;
		lista.appendChild(li);
	});
}


// Remover do localStorage
async function deleteTorneioFromLocalStorage(id_torneio) {
	let torneios = JSON.parse(localStorage.getItem('torneios')) || [];
	torneios = torneios.filter(torneio => torneio.id !== id_torneio);
	localStorage.setItem('torneios', JSON.stringify(torneios));
}





//----------------------------------------------------------------------------------------------------
//
//
//	EXPORT DAS FUNÇÕES
//
//
//----------------------------------------------------------------------------------------------------

export default {
	createTorneio,
	loadTorneios,
	deleteTorneio
}
