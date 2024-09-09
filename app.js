let listaNumerosSorteados = [];
let numeroMaximo = 100
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.0});
}

function exibirMensagemInicial (){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', `Digite um número entre 1 e ${numeroMaximo}`);

}

exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log (chute == numeroSecreto);

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Isso ai você acertou o número secreto');
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Parabéns você acertou com ${tentativas} ${palavraTentativa}.`
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'o número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;



    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
} 

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    tentativas = 1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
//Adivinhe o <span class="container__texto-azul">numero secreto</span>
//Escolha um número entre 1 a 10
