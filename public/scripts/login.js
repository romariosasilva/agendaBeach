// Alterna entre Login e Cadastro
function toggleCadastro() {
	const login				= document.getElementById("login-form");
	const cadastro			= document.getElementById("cadastro-form");
	login.style.display		= login.style.display === "none" ? "flex" : "none";
	cadastro.style.display	= cadastro.style.display === "none" ? "flex" : "none";
}
