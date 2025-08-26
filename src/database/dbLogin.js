import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config.js";

// Inicialização Firebase Authentication
const auth	= getAuth( app );

export async function createUser( user ) {
	let vStatus = "";
	let vMessage = "";

	await createUserWithEmailAndPassword(auth, user.email, user.senha)
	.then(() => {
		vStatus = 'success';
		vMessage = 'Cadastro realizado com sucesso!';
	})
	.catch(error => {
		console.error(error);
		vStatus = 'error';
		vMessage = error.message;
	});
}

export async function loginUser( user ) {
	let vStatus = "";
	let vMessage = "";

	await signInWithEmailAndPassword(auth, user.email, user.senha)
	.then(userCredential => {
		vStatus = 'success';
		vMessage = 'Seja bem-vindo, ' + userCredential.user
	})
	.catch(error => {
		vStatus = 'error'
		vMessage = error.message;
	});

	return {
			status: vStatus,
			message: vMessage
		};
}

// Logout
export async function logout() {
	let vStatus = "";
	let vMessage = "";

	await auth.signOut()
		.then(() => {
			vStatus = 'success';
			vMessage = 'Usuário deslogado com sucesso!';
		})
		.catch(error => {
			vStatus = 'error';
			vMessage = error;
		});

	return {
		status: vStatus,
		message: vMessage
	}
}


// Verifica se usuário já está logado
// auth.onAuthStateChanged(user => {
// 	if (user) {
// 		if ( !window.location.pathname.endsWith("torneios") ) {
// 			window.location.href = "/torneios";
// 		}
// 	} else {
// 		window.location.href = "/login";
// 	}
// });


export default
{
	createUser,
	loginUser,
	logout
}