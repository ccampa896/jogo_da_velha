let jogadoresAtivos = false;

function cellWins(cell) {
  cell.style.border = '8px solid #F94A29';
  cell.style.backgroundColor = '#FC7300';
}

window.onload = function () {
  document.getElementById('players').style.visibility = 'hidden';
  document.getElementById('jogadorAtual').style.visibility = 'hidden';
  document.getElementById('jogo').style.visibility = 'hidden';
};

const infoBtn = document.getElementById('info');

infoBtn.addEventListener('click', () => {
  alert(
    'Jogo da Velha feito com HTML, CSS e JavaScript\n' +
      'Desenvolvido por: @campanaricarlos\n' +
      'GitHub: https://github.com/ccampa896\n' +
      'LinkedIn: https://www.linkedin.com/in/carlos-campanari-9b4b3b1b3/\n'
  );
});

const iconsBtn = document.getElementById('icons');

iconsBtn.addEventListener('click', () => {
  alert('Icons by https://icons.getbootstrap.com/');
});

function useLightTheme() {
  document.body.style.color = '#212529';
  document.body.style.backgroundColor = '#f1f5f9';
  const hash = document.getElementById('hashtag');
  const controller = document.getElementById('controller');
  hash.style.border = '0px solid #fff';
  controller.style.border = '0px solid #fff';
}

function useDarkTheme() {
  document.body.style.color = '#f1f5f9';
  document.body.style.backgroundColor = '#212529';
  const hash = document.getElementById('hashtag');
  const controller = document.getElementById('controller');
  hash.style.margin = '10px';
  controller.style.margin = '10px';
  hash.style.border = '5px solid #fff';
  controller.style.border = '5px solid #fff';
  hash.style.borderRadius = '10px';
  controller.style.borderRadius = '10px';
}

const lightBtn = document.getElementById('is-light');
const darkBtn = document.getElementById('is-dark');

lightBtn.addEventListener('click', useLightTheme);
darkBtn.addEventListener('click', useDarkTheme);

function jogadores() {
  let elementos = document.querySelectorAll('.tresD');

  elementos.forEach(function (elemento) {
    elemento.remove();
  });

  document.getElementById('players').style.visibility = 'visible';
}

const btnJogadores = document.getElementById('jogadores');
btnJogadores.addEventListener('click', jogadores);

let NomeJogador1 = '';
let NomeJogador2 = '';

const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', () => {
  NomeJogador1 = document.getElementById('jogador1').value;
  NomeJogador2 = document.getElementById('jogador2').value;
  jogadoresAtivos = true;
  alert(
    'Jogadores cadastrados!\n' +
      'Jogador 1: ' +
      NomeJogador1 +
      '\n' +
      'Jogador 2: ' +
      NomeJogador2
  );

  let elementos = document.querySelectorAll('#players');
  document.getElementById('jogador1').value = '';
  document.getElementById('jogador2').value = '';

  elementos.forEach(function (elemento) {
    elemento.remove();
  });
});

function Jogador(nome, forma) {
  this.nome = nome;
  this.forma = forma;
}

let jogador1, jogador2;

//Jogador da rodada

let jogadorAtual;

let formas = ['X', 'O'];

/*
0 1 2
3 4 5
6 7 8
*/
let tabuleiro = new Array(9);

const setLabelJogadorAtual = function () {
  document.getElementById('jogadorAtualh3').innerHTML =
    'Jogador atual:  ' + jogadorAtual.nome;
};

function iniciarJogo() {
  if (jogadoresAtivos) {
    alert(
      'Para iniciar um novo jogo, clique em "Reiniciar"\n' +
        'Ou clique em "Parar jogo" para finalizar o jogo atual!'
    );
    alert(
      'Jogo iniciado!\n' +
        'Jogador 1: ' +
        NomeJogador1 +
        '\n' +
        'Jogador 2: ' +
        NomeJogador2 +
        '\n' +
        'Boa sorte!'
    );

    jogador1 = new Jogador(NomeJogador1, 0); //X
    jogador2 = new Jogador(NomeJogador2, 1); //O
    jogadorAtual = jogador1;
    setLabelJogadorAtual();

    document.getElementById('jogadorAtual').style.visibility = 'visible';

    document.getElementById('jogo').style.visibility = 'visible';
  } else {
    alert('Você precisa informar os jogadores!');
  }
}

const btnIniciarJogo = document.getElementById('iniciarJogo');
btnIniciarJogo.addEventListener('click', iniciarJogo);

/*Verifica se o tabuleiro está completamente preenchido, se estiver, significa que ninguém venceu a rodada*/

tabuleiroIsFilled = function () {
  let preenchidos = 0;

  for (let i = 0; i < tabuleiro.length; i++)
    if (tabuleiro[i] != undefined) preenchidos++;

  return preenchidos == tabuleiro.length;
};

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas linhas do tabuleiro, procurando um vencedor*/
const table_datas = document.querySelectorAll('.table-data');

allElementsInSomeLine = function () {
  for (let i = 0; i < 7; i += 3) {
    if (
      tabuleiro[i] == 'X' &&
      tabuleiro[i + 1] == 'X' &&
      tabuleiro[i + 2] == 'X'
    ) {
      cellWins(table_datas[i]);
      cellWins(table_datas[i + 1]);
      cellWins(table_datas[i + 2]);
      alert(jogador1.nome + ' wins!!!');
      removeClicks();
    }
    if (
      tabuleiro[i] == 'O' &&
      tabuleiro[i + 1] == 'O' &&
      tabuleiro[i + 2] == 'O'
    ) {
      cellWins(table_datas[i]);
      cellWins(table_datas[i + 1]);
      cellWins(table_datas[i + 2]);
      alert(jogador2.nome + ' wins!!!');
      removeClicks();
    }
  }
};

/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas colunas do tabuleiro, procurando um vencedor*/

allElementsInSomeColumn = function () {
  for (let i = 0; i < 3; i++) {
    if (
      tabuleiro[i] == 'X' &&
      tabuleiro[i + 3] == 'X' &&
      tabuleiro[i + 6] == 'X'
    ) {
      cellWins(table_datas[i]);
      cellWins(table_datas[i + 3]);
      cellWins(table_datas[i + 6]);
      alert(jogador1.nome + ' wins!!!');
      removeClicks();
      if (
        tabuleiro[i] == 'O' &&
        tabuleiro[i + 3] == 'O' &&
        tabuleiro[i + 6] == 'O'
      ) {
        cellWins(table_datas[i]);
        cellWins(table_datas[i + 3]);
        cellWins(table_datas[i + 6]);
        alert(jogador2.nome + ' wins!!!');
        removeClicks();
      }
    }
  }
};
/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas diagonais do tabuleiro, procurando um vencedor*/

allElementsInSomeDiagonal = function () {
  if (tabuleiro[0] == 'X' && tabuleiro[4] == 'X' && tabuleiro[8] == 'X') {
    alert(jogador1.nome + ' wins!!!');
    removeClicks();
    cellWins(table_datas[0]);
    cellWins(table_datas[4]);
    cellWins(table_datas[8]);
  } else if (
    tabuleiro[2] == 'X' &&
    tabuleiro[4] == 'X' &&
    tabuleiro[6] == 'X'
  ) {
    alert(jogador1.nome + ' wins!!!');
    removeClicks();
    cellWins(table_datas[2]);
    cellWins(table_datas[4]);
    cellWins(table_datas[6]);
  } else if (
    tabuleiro[0] == 'O' &&
    tabuleiro[4] == 'O' &&
    tabuleiro[8] == 'O'
  ) {
    alert(jogador2.nome + ' wins!!!');
    removeClicks();
    cellWins(table_datas[0]);
    cellWins(table_datas[4]);
    cellWins(table_datas[8]);
  } else if (
    tabuleiro[2] == 'O' &&
    tabuleiro[4] == 'O' &&
    tabuleiro[6] == 'O'
  ) {
    alert(jogador2.nome + ' wins!!!');
    removeClicks();
    cellWins(table_datas[2]);
    cellWins(table_datas[4]);
    cellWins(table_datas[6]);
  }
};

const btnCell0 = document.getElementById('cell0');
const btnCell1 = document.getElementById('cell1');
const btnCell2 = document.getElementById('cell2');
const btnCell3 = document.getElementById('cell3');
const btnCell4 = document.getElementById('cell4');
const btnCell5 = document.getElementById('cell5');
const btnCell6 = document.getElementById('cell6');
const btnCell7 = document.getElementById('cell7');
const btnCell8 = document.getElementById('cell8');

/*Preenche a célula da tabela HTML escolhida pelo usuário ao clicar, além de cuidar do jogador atual da rodada e chamar as funções


de verificação de algum ganhador */

function setOnCeil(cell, pos) {
  if (tabuleiro[pos] == undefined) {
    cell.innerText = formas[jogadorAtual.forma];
    tabuleiro[pos] = formas[jogadorAtual.forma];

    if (jogadorAtual == jogador1) {
      jogadorAtual = jogador2;
    } else {
      jogadorAtual = jogador1;
    }

    setLabelJogadorAtual();
  } else {
    alert('Célula já preenchida! Escolha outra!');
  }

  allElementsInSomeLine();

  allElementsInSomeColumn();

  allElementsInSomeDiagonal();

  if (tabuleiroIsFilled()) {
    alert('Nobody wins! :(. Try Again');

    pararJogo();
  }
}

const setCell0 = () => setOnCeil(btnCell0, 0);
const setCell1 = () => setOnCeil(btnCell1, 1);
const setCell2 = () => setOnCeil(btnCell2, 2);
const setCell3 = () => setOnCeil(btnCell3, 3);
const setCell4 = () => setOnCeil(btnCell4, 4);
const setCell5 = () => setOnCeil(btnCell5, 5);
const setCell6 = () => setOnCeil(btnCell6, 6);
const setCell7 = () => setOnCeil(btnCell7, 7);
const setCell8 = () => setOnCeil(btnCell8, 8);

btnCell0.addEventListener('click', setCell0);
btnCell1.addEventListener('click', setCell1);
btnCell2.addEventListener('click', setCell2);
btnCell3.addEventListener('click', setCell3);
btnCell4.addEventListener('click', setCell4);
btnCell5.addEventListener('click', setCell5);
btnCell6.addEventListener('click', setCell6);
btnCell7.addEventListener('click', setCell7);
btnCell8.addEventListener('click', setCell8);

function removeClicks() {
  btnCell0.removeEventListener('click', setCell0);
  btnCell1.removeEventListener('click', setCell1);
  btnCell2.removeEventListener('click', setCell2);
  btnCell3.removeEventListener('click', setCell3);
  btnCell4.removeEventListener('click', setCell4);
  btnCell5.removeEventListener('click', setCell5);
  btnCell6.removeEventListener('click', setCell6);
  btnCell7.removeEventListener('click', setCell7);
  btnCell8.removeEventListener('click', setCell8);
}

function pararJogo() {
  if (jogadoresAtivos) {
    alert(
      'Jogo finalizado!\n' + 'Obrigado por jogar!\n' + 'Página recarregada!'
    );
    jogadoresAtivos = false;
    window.location.reload();
  } else {
    alert('O jogo não foi iniciado!\n' + 'Comece um novo jogo!');
  }
}

const btnPararJogo = document.getElementById('pararJogo');
btnPararJogo.addEventListener('click', pararJogo);

const btnJogoDaVelha = document.getElementById('jogo_wiki');
btnJogoDaVelha.addEventListener('click', () => {
  alert('Página recarregada!\n' + 'Você será redirecionado para a Wikipédia!');
  window.location.reload();
  window.open('https://pt.wikipedia.org/wiki/Jogo_da_velha');
});

const btnResetarJogo = document.getElementById('reset');
btnResetarJogo.addEventListener('click', () => {
  alert('Página recarregada!\n' + 'Jogo resetado!');
  window.location.reload();
});
