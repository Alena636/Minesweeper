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
let count = 1;
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
        event.target.innerHTML = isMines(row, column) ? 'X' : ' ';
        event.target.disabled = true;
        countMoves.textContent = count++;
    })

    function isMines(row, column) {
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
