let listaNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function falar(texto) {
  if (window.responsiveVoice)
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', { rate: 1.1 });
}

function exibirMensagem(texto) {
  document.getElementById("mensagem").innerHTML = texto;
  falar(texto);
}

function gerarNumeroAleatorio() {
  let numero = parseInt(Math.random() * numeroMaximo + 1);
  if (listaNumerosSorteados.includes(numero)) return gerarNumeroAleatorio();
  listaNumerosSorteados.push(numero);
  return numero;
}

function verificarChute() {
  const chute = Number(document.getElementById('entrada').value);
  if (!chute) return;

  if (chute === numeroSecreto) {
    exibirMensagem(`🎉 Você acertou em ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}!`);
    document.getElementById('reiniciar').disabled = false;

    setTimeout(() => {
      const nome = prompt("Digite seu nome para o ranking:");
      if (nome && nome.trim() !== "") {
        salvarRanking(nome.trim(), tentativas);
        exibirRanking();
      }
    }, 500);
  } else if (chute > numeroSecreto) {
    exibirMensagem('🔻 O número secreto é menor!');
  } else {
    exibirMensagem('🔺 O número secreto é maior!');
  }
  tentativas++;
  document.getElementById('entrada').value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  document.getElementById('entrada').value = '';
  document.getElementById('mensagem').innerHTML = 'Novo jogo iniciado!';
  document.getElementById('reiniciar').disabled = true;
}

// ===== RANKING LOCAL =====
function salvarRanking(nome, pontuacao) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ nome, pontuacao });
  ranking.sort((a, b) => a.pontuacao - b.pontuacao);
  ranking = ranking.slice(0, 10);
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function exibirRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  const lista = document.getElementById("ranking-lista");
  lista.innerHTML = ranking
    .map((r, i) => `<li><span>${i + 1}º</span> ${r.nome} — <strong>${r.pontuacao} tentativas</strong></li>`)
    .join("");
}

function limparRanking() {
  if (confirm("Deseja apagar o ranking?")) {
    localStorage.removeItem("ranking");
    exibirRanking();
  }
}

exibirRanking();
