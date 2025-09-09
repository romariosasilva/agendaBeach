// Alterna entre Login e Cadastro
function toggleCadastro(action) {
	const triggerEl = document.querySelector(`#myTab button[data-bs-target="#${action}-tab-pane"]`);
	const tabTrigger = new bootstrap.Tab(triggerEl);
	tabTrigger.show();
}
