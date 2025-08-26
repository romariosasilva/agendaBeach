import { systemConfig } from './config.js';
import { createUser, loginUser } from './database/dbLogin.js';

//----------------------------------------------------------------------------------------------------
//
//
//	FUNÇÕES HOME
//
//
//----------------------------------------------------------------------------------------------------

export async function pageHome(req, res) {
	try {
		const options = {
			site_name: systemConfig.siteName,
		};

		return res.render("index.html", { options } );
	}
	catch (error) {
		console.log(error);
		// return res.render("404.html", { options } );
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
	try {
		const options = {
			site_name: systemConfig.siteName,
		};

		return res.render("login.html", { options } );
	}
	catch (error) {
		console.log(error);
		// return res.render("404.html", { options } );
	}
}

export async function login(req, res)
{
	const user = {
		email: req.body.email,
		senha: req.body.senha
	}

	try {
		const userLogin = await loginUser( user );

		if( userLogin.status == 'success' )
		{
			return res.redirect("/torneios");
		}
		else
		{
			console.log(userLogin.message);
			// showToast(userCreated.message, userCreated.status);
		}
	}
	catch (error)
	{
		console.log(error);
		// return res.render("404.html", { error } );
	}
}

export async function createLogin(req, res)
{
	const user = {
		email: req.body.email,
		senha: req.body.senha
	}

	try {
		const userCreated = await createUser( user );

		console.log( userCreated );

		if( userCreated.status == 'success' )
		{
			return res.redirect("/login");
		}
		else
		{
			console.log(userCreated.message);
			// showToast(userCreated.message, userCreated.status);
		}
	}
	catch (error)
	{
		console.log(error);
		// return res.render("404.html", { error } );
	}

}

//----------------------------------------------------------------------------------------------------
//	FUNÇÕES TORNEIOS
//----------------------------------------------------------------------------------------------------

export async function pageTorneios(req, res)
{
	try
	{
		const options = {
			site_name: systemConfig.siteName,
		};

		return res.render( "torneios.html", { options } );
	}
	catch (error)
	{
		console.log(error);
		// return res.render("404.html", { options } );
	}
}


//----------------------------------------------------------------------------------------------------
//	EXPORT DAS FUNÇÕES
//----------------------------------------------------------------------------------------------------

export default
{
	pageHome,
	pageLogin,
	pageTorneios,
	createLogin,
	login
}
