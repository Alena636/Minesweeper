let width = 10;
let height = 10;
let minesCount = 10;
//add container---------------------------------------
function createContainer() {
    const container = document.createElement('div');
    container.className = 'container';
    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Minesweeper';
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const time = document.createElement('h3');
    time.className = 'time';
    time.innerHTML = '<time>00:00:00</time>'
    const countMoves = document.createElement('h3');
    countMoves.className = 'count';
    countMoves.innerHTML = '<p class="moves">0</p>'
    //countMoves.textContent = '0';
    const field = createField();
    wrapper.append(time, countMoves);
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

let countMoves = document.querySelector('.count');
let countMov = 1;
function startGame() {
    const field = document.querySelector('.field');
    const cellsCount = width * height;
    const cells = [...field.children];
    const minesIndex = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, minesCount);
    field.addEventListener('click', (event) => {
        if(event.target.tagName !== 'BUTTON') {
            return;
        }
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);
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
            cell.innerHTML = 'X';
            return;
            //сюда вставить название функции которая вызывает проигрыш
        }
        const count = getMinesCount(row, column);
        if(count !== 0) {
            cell.innerHTML = count;
            return;
        }
        for (let x = -1; x <= 1; x++) { //перебираем соседние клетки
            for(let y = -1; y <= 1; y++) {
                openCell(row + y, column + x) //открываем соседние ячейки
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

function addTime() {
    const time = document.querySelector('.time')
    tick();
    time.textContent = (hrs > 9 ? hrs : '0' + hrs) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
    timer();
}
let t;
function timer() {
    t = setTimeout(addTime, 1000);
}

timer();
