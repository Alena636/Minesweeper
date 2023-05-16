let width = 10;
let height = 10;
let minesCount = 10;
//add container---------------------------------------
function createContainer() {
    const container = document.createElement('div');
    container.className = 'container';
    const title = document.createElement('h2');
    title.className = 'title';
    title.textContent = 'Minesweeper';
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const time = document.createElement('h3');
    time.className = 'time';
    time.innerHTML = '<time>00:00:00</time>'
    const newGame = document.createElement('button');
    newGame.className = 'new_game-btn';
    newGame.textContent = 'New Game';
    const countMoves = document.createElement('h3');
    countMoves.className = 'count';
    countMoves.innerHTML = '<p class="moves">0</p>'
    //countMoves.textContent = '0';
    const field = createField();
    wrapper.append(time, newGame, countMoves);
    container.append(title, wrapper, field);
    document.body.append(container);
}
createContainer();

//create field for mines-----------------------------
function createField() {
    const field = document.createElement('div');
    field.className = 'field';
    const cellsCount = width * height;
    field.innerHTML = '<button class="cell"></button>'.repeat(cellsCount);
    return field;
}
let firstClick = 0;
let countMoves = document.querySelector('.count');
let countMov = 1;
function startGame() {
    const field = document.querySelector('.field');
    const cellsCount = width * height;
    const cells = [...field.children];

    let closedCells = cellsCount;

    let minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
    field.addEventListener('click', (event) => {
        if(event.target.tagName !== 'BUTTON') {
            return;
        }
        event.target.textContent = ' ';
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);
        firstClick++;
        if(firstClick === 1 && minesIndex.includes(index)) {
            while (minesIndex.includes(index)) {
                minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
            }
            console.log('dfhgh')
        }
        openCell(row, column);
        countMoves.textContent = countMov++;
       
        
    })

    function isValidCount(row, column) {
        return row >= 0 && row < height && column >= 0 && column < width;
    }

    function getMinesCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) { //перебираем соседние клетки
            for(let y = -1; y <= 1; y++) {
                if(isMines(row + y, column + x)) {
                    count++
                }
            }
        }
        return count;
    }

    function openCell(row, column) {
        if(!isValidCount(row, column)) return;
        const index = row * width + column;
        const cell = cells[index];

        if(cell.disabled === true) return;

        cell.disabled = true;
        
        

        if(isMines(row, column)) {
            cell.innerHTML = '<img src="assets/bomb.svg" alt="Mine" />';
            cell.style.backgroundColor = 'red';
            setTimeout(getLoseMessage, 800);
            clearTimeout(t);
            return;
        }
        closedCells--;
        if(closedCells <= minesCount) {
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
            })
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
            })
        }

        const count = getMinesCount(row, column);
        if(count !== 0) {
            cell.innerHTML = count;
            if(count === 1) {
                cell.style.backgroundColor = 'lightgreen';
                return;
            }
            if(count === 2) {
                cell.style.backgroundColor = '#1b998b';
                return;
            }
            if(count === 3) {
                cell.style.backgroundColor = '#f46036';
                return;
            }
            if(count === 4) {
                cell.style.backgroundColor = '#d7263d';
                return;
            }
            if(count === 5) {
                cell.style.backgroundColor = '#2e294e';
                return;
            }
            if(count === 6) {
                cell.style.backgroundColor = '#990033';
                return;
            }
            if(count === 7) {
                cell.style.backgroundColor = '#ff9000';
                return;
            }
            if(count === 8) {
                cell.style.backgroundColor = '#660000';
                return;
            }
            return;
        }
        
        for (let x = -1; x <= 1; x++) { //перебираем соседние клетки
            for(let y = -1; y <= 1; y++) {
                openCell(row + y, column + x) //открываем соседние ячейки
                cell.style.backgroundColor = '#89a7a7';
            }
        }
    }
    

    function isMines(row, column) {
        if(!isValidCount(row, column)) return false;
        const index = row * width + column;
       // const cellsCount = width * height;
       // const minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
        console.log(minesIndex)
        return minesIndex.includes(index);
    }
    
}
startGame()

//create timer---------------------------------------------
let sec = 0;
let min = 0;
let hrs = 0;
function tick() {
    sec++;
    if(sec >= 60) {
        sec = 0;
        min++;
        if(min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
const time = document.querySelector('.time');
function addTime() {
    tick();
    time.textContent = (hrs > 9 ? hrs : '0' + hrs) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
    timer();
}
let t;
function timer() {
    t = setTimeout(addTime, 1000);
}


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
})

const newGame = document.querySelector('.new_game-btn');
newGame.addEventListener('click', () => {
        window.location.reload();
    })




