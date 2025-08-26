import express from 'express';
import nunjucksPkg from 'nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import { pageHome, pageLogin, pageTorneios, createLogin, login } from './pages.js';

// Para compatibilidade com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
	.use( express.urlencoded( { extended: true } ) )	// Recebimento dos dados do req.body
	.use( express.static( 'public' ) )					// Configuracao local dos arquivos estáticos (css, scripts, imagens)
	.get( '/', pageHome )								// Rota da pagina Home
	.get( '/login', pageLogin )							// Rota da pagina Login
	.get( '/torneios', pageTorneios )					// Rota da pagina Torneios
	.post( '/login', login )
	.post( '/createLogin', createLogin );
	// .post( '/torneio', createTorneio )


// Exporta como função handler para Vercel
export default app;
