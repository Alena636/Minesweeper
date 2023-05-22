let width = 10;
let height = 10;
let minesCount = 10;

// add container---------------------------------------
function createContainer() {
  const container = document.createElement('div');
  container.className = 'container';
  const header = document.createElement('header');
  header.className = 'header';
  const newGame = document.createElement('button');
  newGame.className = 'new_game-btn';
  newGame.textContent = 'New Game';
  const easy = document.createElement('button');
  easy.className = 'easy checked';
  easy.textContent = 'Easy';
  const medium = document.createElement('button');
  medium.className = 'medium';
  medium.textContent = 'Medium';
  const hard = document.createElement('button');
  hard.className = 'hard';
  hard.textContent = 'Hard';
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const time = document.createElement('h3');
  time.className = 'time';
  time.innerHTML = '<time>00:00:00</time>';
  const flag = document.createElement('div');
  flag.className = 'flag';
  flag.innerHTML = '<img src="assets/flag.svg" alt="flag" width="70" />';
  const countFlag = document.createElement('p');
  countFlag.className = 'count_flag';
  countFlag.textContent = '10';
  const countMoves = document.createElement('h3');
  countMoves.className = 'count';
  countMoves.innerHTML = '<p class="moves">0</p>';
  const field = createField();
  const footer = document.createElement('div');
  footer.className = 'footer';
  const soundBtn = document.createElement('button');
  soundBtn.innerHTML = '<img src="assets/soundIcon.svg" alt="sound_icon" />';
  soundBtn.classList = 'sound-btn';
  const theme = document.createElement('button');
  theme.className = 'theme';
  flag.append(countFlag);
  header.append(newGame, easy, medium, hard);
  wrapper.append(time, flag, countMoves);
  footer.append(soundBtn, theme);
  container.append(header, wrapper, field, footer);
  document.body.append(container);
}
createContainer();

// create timer---------------------------------------------
let sec = 0;
let min = 0;
let hrs = 0;
function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
      hrs++;
    }
  }
}
const time = document.querySelector('.time');
function addTime() {
  tick();
  time.textContent = `${hrs > 9 ? hrs : `0${hrs}`}:${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
  timer();
}
let t;
function timer() {
  t = setTimeout(addTime, 1000);
}

const easy = document.querySelector('.easy.checked');
const medium = document.querySelector('.medium');
// const hard = document.querySelector('.hard');

const countFlag = document.querySelector('.count_flag');
let countFlags = 9;

// create field for mines-----------------------------
function createField() {
  const field = document.createElement('div');
  field.className = 'field';
  const cellsCount = width * height;
  field.innerHTML = '<button class="cell"></button>'.repeat(cellsCount);
  return field;
}

const soundBtn = document.querySelector('.sound-btn');
soundBtn.addEventListener('click', () => {
  soundBtn.classList.toggle('sound');
});

let firstClick = 0;
const countMoves = document.querySelector('.count');
let countMov = 1;

function startGame() {
  if (medium.classList.contains('checked')) {
    width = 15;
    height = 15;
    minesCount = 15;
    return;
  }
  const field = document.querySelector('.field');
  const cellsCount = width * height;
  const cells = [...field.children];

  let closedCells = cellsCount;

  let minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    event.target.textContent = ' ';
    const index = cells.indexOf(event.target);
    const column = index % width;
    const row = Math.floor(index / width);
    firstClick++;
    if (firstClick === 1 && minesIndex.includes(index)) {
      while (minesIndex.includes(index)) {
        minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
      }
      // console.log('bomb');
    }
    openCell(row, column);
    const audio = new Audio();
    audio.src = 'assets/openCell.mp3';
    audio.play();
    if (soundBtn.classList.contains('sound')) {
      audio.volume = 0;
    }
    countMoves.textContent = countMov++;
  });

  field.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    // если кликаешь на циру то она превращется в флажок такого не должно быть
    if (countFlags !== -1) {
      event.target.classList.toggle('flag_img');
      // innerHTML = '<img src="assets/icon-flag.png" alt="flag" width="70" />';
      countFlag.textContent = countFlags--;
      /* if(event.target.classList.contains('flag_img') ) {
                    event.target.classList.remove('flag_img');
                    countFlag.textContent = countFlags++;
                    return;
                } */
      const audio = new Audio();
      audio.src = 'assets/flag.mp3';
      audio.play();
      if (soundBtn.classList.contains('sound')) {
        audio.volume = 0;
      }
    }
  });

  function isValidCount(row, column) {
    return row >= 0 && row < height && column >= 0 && column < width;
  }

  function getMinesCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) { // перебираем соседние клетки
      for (let y = -1; y <= 1; y++) {
        if (isMines(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  function openCell(row, column) {
    if (!isValidCount(row, column)) return;
    const index = row * width + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;

    if (isMines(row, column)) {
      cell.innerHTML = '<img src="assets/bomb.svg" alt="Mine" />';
      cell.style.backgroundColor = 'red';
      const audio = new Audio();
      audio.src = 'assets/bomb.mp3';
      audio.play();
      audio.volume = 1;
      if (soundBtn.classList.contains('sound')) {
        audio.volume = 0;
      }
      setTimeout(getLoseMessage, 900);
      clearTimeout(t);
      return;
    }
    closedCells--;
    if (closedCells <= minesCount) {
      getWinMessage();
      clearTimeout(t);
    }

    function getWinMessage() {
      const messageWrapper = document.createElement('div');
      messageWrapper.className = 'message-wrapper';
      const messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';
      const message = document.createElement('p');
      message.className = 'message';
      message.innerHTML = '<p>Hooray! You found all mines in ' + `${min}` + ' minutes ' + `${sec}` + ' seconds and ' + `${countMov}` + ' moves!</p>';
      const newGameBtn = document.createElement('button');
      newGameBtn.className = 'new_game';
      newGameBtn.textContent = 'New Game';
      messageContainer.append(message, newGameBtn);
      messageWrapper.append(messageContainer);
      document.body.append(messageWrapper);
      newGameBtn.addEventListener('click', () => {
        window.location.reload();
        document.body.classList.add('lock');
      });
      const audio = new Audio();
      audio.src = 'assets/win.mp3';
      audio.play();
      if (soundBtn.classList.contains('sound')) {
        audio.volume = 0;
      }
    }

    function getLoseMessage() {
      const messageWrapper = document.createElement('div');
      messageWrapper.className = 'message-wrapper';
      const messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';
      const message = document.createElement('p');
      message.className = 'message';
      message.innerHTML = 'Game over. Try again';
      const newGameBtn = document.createElement('button');
      newGameBtn.className = 'new_game';
      newGameBtn.textContent = 'New Game';
      messageContainer.append(message, newGameBtn);
      messageWrapper.append(messageContainer);
      document.body.append(messageWrapper);
      newGameBtn.addEventListener('click', () => {
        window.location.reload();
        document.body.classList.add('lock');
      });
      const audio = new Audio();
      audio.src = 'assets/lose.mp3';
      audio.play();
      if (soundBtn.classList.contains('sound')) {
        audio.volume = 0;
      }
    }

    const count = getMinesCount(row, column);
    if (count !== 0) {
      cell.innerHTML = count;
      if (count === 1) {
        cell.style.backgroundColor = 'lightgreen';
        return;
      }
      if (count === 2) {
        cell.style.backgroundColor = '#1b998b';
        return;
      }
      if (count === 3) {
        cell.style.backgroundColor = '#f46036';
        return;
      }
      if (count === 4) {
        cell.style.backgroundColor = '#d7263d';
        return;
      }
      if (count === 5) {
        cell.style.backgroundColor = '#2e294e';
        return;
      }
      if (count === 6) {
        cell.style.backgroundColor = '#990033';
        return;
      }
      if (count === 7) {
        cell.style.backgroundColor = '#ff9000';
        return;
      }
      if (count === 8) {
        cell.style.backgroundColor = '#660000';
        return;
      }
      return;
    }

    for (let x = -1; x <= 1; x++) { // перебираем соседние клетки
      for (let y = -1; y <= 1; y++) {
        openCell(row + y, column + x); // открываем соседние ячейки
        cell.style.backgroundColor = '#89a7a7';
      }
    }
  }

  function isMines(row, column) {
    if (!isValidCount(row, column)) return false;
    const index = row * width + column;
    // console.log(minesIndex);
    return minesIndex.includes(index);
  }
}
startGame();

function buildModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-window active';

  const title = document.createElement('h1');
  title.className = 'title-name';
  title.textContent = 'Minesweeper';

  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  const buttonStart = document.createElement('button');
  buttonStart.textContent = 'START';
  buttonStart.className = 'start-button';

  modal.append(title, modalContainer, buttonStart);
  document.body.append(modal);
}
buildModal();

const buttonStart = document.querySelector('.start-button');
const modal = document.querySelector('.modal-window.active');
buttonStart.addEventListener('click', () => {
  modal.classList.remove('active');
  timer();
});

const newGame = document.querySelector('.new_game-btn');
newGame.addEventListener('click', () => {
  window.location.reload();
});

const wrapper = document.querySelector('.wrapper');
const container = document.querySelector('.container');
const theme = document.querySelector('.theme');
theme.addEventListener('click', () => {
  theme.classList.toggle('light');
  document.body.classList.toggle('light_theme');
  container.classList.toggle('light_container');
  wrapper.classList.toggle('light_wrapper');
});

medium.addEventListener('click', () => {
  easy.classList.remove('checked');
  medium.classList.add('checked');
});
