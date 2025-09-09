import { systemConfig } from './config.js';
import { createUser, loginUser } from './database/dbLogin.js';
import { createTorneio, loadTorneios, deleteTorneio } from './database/dbTorneios.js';

//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES HOME
//
//
//----------------------------------------------------------------------------------------------------

export async function pageHome(req, res) {
	const options = {
		site_name: systemConfig.siteName,
	};

	try {
		return res.render("index.html", { options } );
	}
	catch (error) {
		return res.render("404.html", { options, error } );
	}
}





//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES LOGIN
//
//
//----------------------------------------------------------------------------------------------------

export async function pageLogin(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	try {
		return res.render("login.html", { options } );
	}
	catch (error) {
		return res.render("404.html", { options, error } );
	}
}


export async function pageLogin2(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	try {
		return res.render("_old.login.html", { options } );
	}
	catch (error) {
		return res.render("404.html", { options, error } );
	}
}


export async function login(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	const user = {
		email: req.body.signin_email,
		senha: req.body.signin_password
	}

	try {
		const userLogin = await loginUser( user );

		if( userLogin.status == 'success' )
		{
			return res.redirect("/torneios");
		}
		else
		{
			let message = userLogin.message;

			return res.render("404.html", { options, message } );
			// showToast(userCreated.message, userCreated.status);
		}
	}
	catch (error)
	{
		return res.render("404.html", { options, error } );
	}
}

export async function createLogin(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	const user = {
		email: req.body.signup_email,
		senha: req.body.signup_senha
	}

	try {
		const userCreated = await createUser( user );

		if( userCreated.status == 'success' )
		{
			return res.redirect("/login");
		}
		else
		{
			let message = userCreated.message;

			return res.render("404.html", { options, message } );
			// showToast(userCreated.message, userCreated.status);
		}
	}
	catch (error)
	{
		return res.render("404.html", { options, error } );
	}
}





//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES TORNEIOS
//
//
//----------------------------------------------------------------------------------------------------

export async function pageTorneios(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	try {
		const torneios = await loadTorneios();

		return res.render( "torneios.html", { options, torneios } );
	}
	catch (error) {
		return res.render("404.html", { options, error } );
	}
}

export async function formTorneio(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	try {
		return res.render( "torneio.html", { options } );
	}
	catch (error) {
		return res.render("404.html", { options, error } );
	}
}

export async function createTorneios(req, res)
{
	const options = {
		site_name: systemConfig.siteName,
	};

	const user = {
		email: req.body.email,
		senha: req.body.senha
	}

	try {
		const userCreated = await createUser( user );

		if( userCreated.status == 'success' )
		{
			return res.redirect("/login");
		}
		else
		{
			let message = userCreated.message;

			return res.render("404.html", { options, message } );
			// showToast(userCreated.message, userCreated.status);
		}
	}
	catch (error)
	{
		return res.render("404.html", { options, error } );
	}
}





//----------------------------------------------------------------------------------------------------
//
//
//	EXPORT DAS FUNÇÕES
//
//
//----------------------------------------------------------------------------------------------------

export const modules = {
	home: {
		pageHome,
	},
	login: {
		pageLogin,
		pageLogin2,
		createLogin,
		login,
	},
	torneio: {
		pageTorneios,
		formTorneio,
		createTorneios
	}
};

export default modules;
