import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/authentication.js";

export async function createUser( user ) {
	let vStatus = '';
	let vMessage = '';

	await createUserWithEmailAndPassword(auth, user.email, user.senha)
	.then(() => {
		vStatus = 'success';
		vMessage = 'Cadastro realizado com sucesso!';
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

export async function loginUser( user ) {
	let vStatus = '';
	let vMessage = '';

	await signInWithEmailAndPassword(auth, user.email, user.senha)
	.then(userCredential => {
		vStatus = 'success';
		vMessage = 'Seja bem-vindo, ' + userCredential.user;
	})
	.catch(error => {
		vStatus = 'error';

		if ( error.code === 'auth/network-request-failed' )
			vMessage = "Network error. Please check your internet connection.";
		else
			vMessage = error.code;
	});

	return {
		status: vStatus,
		message: vMessage
	};
}

// Logout
export async function logout() {
	let vStatus = '';
	let vMessage = '';

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
// 		if ( !window.location.pathname.endsWith('torneios') ) {
// 			window.location.href = '/torneios';
// 		}
// 	} else {
// 		window.location.href = '/login';
// 	}
// });





//----------------------------------------------------------------------------------------------------
//
//
//	EXPORT DAS FUNÇÕES
//
//
//----------------------------------------------------------------------------------------------------

export default
{
	auth,
	createUser,
	loginUser,
	logout
}
