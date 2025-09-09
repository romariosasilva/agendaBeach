import express from 'express';
import nunjucksPkg from 'nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import { modules } from './pages.js';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './auth/authentication.js';

// Para compatibilidade com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Auth
// onAuthStateChanged(auth, user => {
// 	if (user) {

// 		if ( window.location.pathname.endsWith("login") ) {
// 			window.location.href = "torneios";
// 		} else {
// 			loadTournaments();
// 		}
// 	} else {
// 		if ( !window.location.pathname.endsWith("login")) {
// 			window.location.href = "login";
// 		}
// 	}
// });


const app = express();

// Configuração nunjucks (template engine)
const { configure } = nunjucksPkg;
configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: app,
	noCache: true
});

// Configuração e inicialização do servidor
app
	// Recebimento dos dados do req.body
	.use( express.urlencoded( { extended: true } ) )

	// Configuração local dos arquivos estáticos (css, scripts, imagens)
	.use( express.static( 'public' ) )

	// ROTAS DO MÓDULO HOME
	.get( '/', modules.home.pageHome )

	// ROTAS DO MÓDULO DE LOGIN
	.get( '/login', modules.login.pageLogin )
	.get( '/login2', modules.login.pageLogin2 )
	.post( '/login', modules.login.login )
	.post( '/createLogin', modules.login.createLogin )

	// ROTAS DO MÓDULO DE TORNEIOS
	.get( '/torneios', modules.torneio.pageTorneios )
	.get( '/torneio', modules.torneio.formTorneio )
	.post( '/createTorneio', modules.torneio.createTorneios );


// Exporta como função handler para Vercel
export default app;
