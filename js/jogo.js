// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

function adicionarElemento(obj, tipo, conteudo) {
  const elemento = tipo === 'img' 
    ? criarImagem(conteudo) 
    : criarElementoTexto(tipo, conteudo);
  
  obj.appendChild(elemento);
}

// Funções auxiliares (coloque logo abaixo da adicionarElemento)
function criarImagem(src) {
  const img = new Image(100);
  img.src = src;
  return img;
}

function criarElementoTexto(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  elemento.style.fontSize = '80px';
  elemento.style.display = 'block';
  return elemento;
}

// Função para quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  adicionarElemento(obj, 'img', 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f380.svg');
}

// Função para quando o jogador erra
function errou(obj) {
  obj.className = "errou";
  adicionarElemento(obj, 'span', '💀');
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
    if (['0', '1', '2', '3', '4', '5'].includes(divis[i].id)) {
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
