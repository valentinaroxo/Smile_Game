// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função genérica para adicionar elementos nas divs
function adicionarElemento(obj, tipo, id, conteudo, estilo = {}, classe = '') {
  let elemento;
  if (tipo === 'img') {
    elemento = new Image(100);
    elemento.src = conteudo;
  } else {
    elemento = document.createElement(tipo);
    elemento.innerHTML = conteudo;
  }

  elemento.id = id;
  elemento.className = classe;

  for (let prop in estilo) {
    elemento.style[prop] = estilo[prop];
  }

  obj.appendChild(elemento);
}

// Função para quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  adicionarElemento(obj, 'img', 'imagem', 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f380.svg');
}

// Função para quando o jogador erra
function errou(obj) {
  obj.className = "errou";
  adicionarElemento(obj, 'span', 'dark_emoji', '💀', {
    fontSize: '80px',
    display: 'block'
  });
}

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5) {
      divis[i].className = "inicial";
      while (divis[i].firstChild) {
        divis[i].removeChild(divis[i].firstChild);
      }
    }
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função que verifica se o jogador acertou ou errou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 6) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
