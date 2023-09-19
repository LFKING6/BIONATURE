const inputs = document.querySelector(".inputs");
const resetarBt = document.querySelector(".resetar");
const dica = document.querySelector(".dica span");
const chances = document.querySelector(".chances span");
const letrasErradas = document.querySelector(".erros span");
const digitarInput = document.querySelector(".digitar_input");

let palavra, maxChances, certa = [], errada = [], games = 0, sorteados = []

// Função para gerar um número aleatório dentro de um intervalo específico
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Função para realizar o sorteio
  function realizarSorteio(min, max) {
    if (min >= max) {
      console.error("O valor mínimo deve ser menor que o valor máximo.");
      return;
    }
  
    if (!this.numerosSorteados) {
      this.numerosSorteados = [];
    }
  
    const numeroSorteado = gerarNumeroAleatorio(min, max);
  
    if (this.numerosSorteados.includes(numeroSorteado)) {
      console.log(`O número ${numeroSorteado} já foi sorteado. Sorteando novamente...`);
      return realizarSorteio(min, max);
    } else {
      this.numerosSorteados.push(numeroSorteado);
      console.log(`Número sorteado: ${numeroSorteado}`);
      return numeroSorteado;
    }
}
  
  // Exemplo de uso
//   const numeroSorteado1 = realizarSorteio(1, 100);
//   const numeroSorteado2 = realizarSorteio(1, 100);
  

function randomPalavra() {
    const sorteio = realizarSorteio(1, 8)

    console.log(sorteio)

    let ranObj = palavraLista[sorteio - 1];
    palavra = ranObj.palavra;
    maxChances = 8; certa = []; errada = [];

    dica.innerText = ranObj.dica;
    chances.innerText = maxChances;
    letrasErradas.innerText = errada;

    let html = "";
    for (let i = 0; i < palavra.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomPalavra();

function inicioJogo(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !errada.includes(`${key}`) && !certa.includes(key)) {
        if(palavra.includes(key)) {
            for (let i = 0; i < palavra.length; i++) {
                if(palavra[i] === key ) {
                    certa.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxChances--;
            errada.push(`${key}`);
        }
        letrasErradas.innerText = errada;
        chances.innerText = maxChances;
    }
    digitarInput.value = "";

    if(certa.length === palavra.length) {
        alert(`Parábens! Você acertou a palavra. ${palavra.toUpperCase()}`)
        games += 1
        if(games === 8) {
            window.location.href = "pop-upmedio.html";
        }
        randomPalavra();
    } else if(maxChances < 1) {
        alert("O jogo acabou! Você não tem mais chances.");
        for (let i = 0; i < palavra.length; i++) {
            inputs.querySelectorAll("input")[i].value = palavra[i];
        }
    }


    // setTimeout(() => {

    // })
}

resetarBt.addEventListener("click", randomPalavra);
digitarInput.addEventListener("input", inicioJogo);
inputs.addEventListener("click", () => digitarInput.focus());
document.addEventListener("keydown", () => digitarInput.focus());