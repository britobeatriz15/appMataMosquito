/*Vamos usar o Windows (Bom) para mexermos com a altura e
 largura do nosso app */

var altura = 0
var largura = 0
var vidas = 1
var tempo = 30

//aqui recupera o nivel da url, sem usar ela por completo.
var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    //1500
    criaMosquito = 1500
} else if(nivel === 'dificil'){
    //1000
    criaMosquito = 1000
}else if(nivel === 'muito_dificil'){
    //750
    criaMosquito = 850
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1
    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000)

function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)

    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
            //vamos usar o window para direcionamento para page de Game Over
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

/*se a posição for 0 e receber 0, ela recebe a si mesmo
criando probabilidade das posições negativas serem randomicas*/ 
    
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

//criar o elemento html utilizando o DOM

    var mosquito = document.createElement('img')

    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        /*usaremos o this, que faz referencias ao próprio elemento HTML
        que executa a função*/
        this.remove()
    }

    document.body.appendChild(mosquito)
}

//Agora criar tamanhos aleatorios para a mosca

function tamanhoAleatorio() {
    //como são 3 retornos, multiplicamos por 3
    var classe = Math.floor(Math.random() * 3)
    console.log(classe)

    switch(classe) {
    //se o valor for 0, vai entrar nesta case, vai retornar mosquito1
        case 0:
            return 'mosquito1'

    //se o valor for 1, vai entrar nesta case, vai retornar mosquito2
        case 1:
            return 'mosquito2'

    //se o valor for 2, vai entrar nesta case, vai retornar mosquito3
        case 2:
            return 'mosquito3'
    }

    /*sem necessidade de uso Break no código, pois cada case tem um return
    e sendo assim o processamento é interrompido sem necessidade deste uso*/
}

//Agora aqui vamos girar a visão de onde a mosca olha, esquerda e direita

function ladoAleatorio() {
    //como são 2 retornos, multiplicamos por 2
    var classe = Math.floor(Math.random() * 2)
    console.log(classe)

    switch(classe) {
    //vão virar pra esquerda e direita
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}
