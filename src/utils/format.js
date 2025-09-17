export function tempoRestante(timestamp) {
	const dateActual = new Date();
	const dateNext = new Date(timestamp);

	const diffMs = dateNext - dateActual;
	const segundos = Math.floor(diffMs / 1000);
	const minutos = Math.floor(segundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);
	const semanas = Math.floor(dias / 7);

	const meses = Math.floor((dateNext.getFullYear() - dateActual.getFullYear()) * 12 + (dateNext.getMonth() - dateActual.getMonth()));
	const anos = Math.floor(meses / 12);

	// Preferir anos se > 1
	if (anos > 1) return `Faltam ${anos} anos`;
	if (meses > 1) return `Faltam ${meses} meses`;
	if (semanas > 1) return `Faltam ${semanas} semanas`;
	if (dias > 1) return `Faltam ${dias} dias`;
	if (dias == 0 && dateActual.getDay() < dateNext.getDay() ) return 'É amanhã!';
	if (dateActual.getDay() == dateNext.getDay() ) return 'Acontecendo agora!';
	if (dias < 0 ) return 'Campeonato encerrado!';
}

export default tempoRestante;
