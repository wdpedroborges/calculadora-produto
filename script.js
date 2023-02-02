let questaoAtual = 0, questaoRespondida = false;
const alternativas = [... document.querySelectorAll('.alternativa')];
const questoes = [... document.querySelectorAll('.questao')];
const divQuestoes = document.querySelector('.questoes');
const divResultado = document.querySelector('.resultado');
const btnProximaQuestao = document.getElementById('btnProximaQuestao');
const btnVerResultado = document.getElementById('btnVerResultado');

const escondeOutrasQuestoes = () => {
	for (let i = 0; i < questoes.length; i++) {
		if (i != questaoAtual) {
			questoes[i].classList.add('hide');
		}
	}		
}

alternativas.forEach(alternativa => {
	alternativa.addEventListener('click', () => {
		let questaoAtual = alternativa.getAttribute('for');
		let alternativasQuestaoAtual = [... document.querySelectorAll(`[for='${questaoAtual}']`)];
		alternativasQuestaoAtual.forEach(aqa => {
			aqa.classList.remove('escolhida');
		});
		alternativa.classList.add('escolhida');
		questaoRespondida = true;
	});
});

escondeOutrasQuestoes();

btnProximaQuestao.addEventListener('click', () => {
	if (questaoAtual === questoes.length - 2) {
		btnProximaQuestao.classList.add('hide');
		btnVerResultado.classList.remove('hide');
	}

	if (questaoAtual < questoes.length && questaoRespondida) {
		questaoAtual++;
		questoes.forEach(questao => { questao.classList.remove('hide'); });
		questaoRespondida = false;
		escondeOutrasQuestoes();
	}
});

btnVerResultado.addEventListener('click', () => {
	if (questaoRespondida) {
		btnVerResultado.classList.add('hide');
		let escolhidas = [... document.querySelectorAll('.escolhida')];
		let textoEscolhidas = [];
		let valor = 0;

		escolhidas.forEach(escolhida => {
			valor += parseInt(escolhida.getAttribute('valor'));
			textoEscolhidas.push(escolhida.getAttribute('alt'));
		});

		divQuestoes.classList.add('hide');
		divResultado.classList.remove('hide');

		divResultado.querySelector('p').textContent = `😁 Opa! O valor calculado ficou em torno de R$${valor}. Entre em contato comigo, pois com certeza posso te ajudar com o que você precisa:`

		let ul = document.createElement('ul');
		for (let i = 0; i < textoEscolhidas.length; i++) {
			let li = document.createElement("li");
			li.textContent = textoEscolhidas[i];
			ul.appendChild(li);
		}

		divResultado.appendChild(ul);
	}
});