import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Carrega variáveis do .env
dotenv.config();

const app = express();

// Para compatibilidade com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura Nunjucks
nunjucks.configure('src/views', {
	autoescape: true,
	express: app,
	noCache: true
});

// Rota principal
app
	.use(express.urlencoded({ extended: true }))	// Recebimento dos dados do req.body
	.use(express.static("public"))					// Configuracao local dos arquivos estaticos (css, scripts, imagens)
	.get('/', (req, res) => {
		res.render('index.html', {
			siteName: process.env.SITE_NAME || 'Meu Site de Torneios'
		});
	})
	.listen(process.env.PORT);						// Inicializacao do servidor


// Exporta como função handler para Vercel
export default app;
