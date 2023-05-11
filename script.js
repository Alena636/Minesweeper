let width = 10;
let height = 10;
//add container 
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
    const countMoves = document.createElement('h4');
    countMoves.className = 'count';
    countMoves.textContent = '0';
    const field = createField();
    wrapper.append(time, countMoves);
    container.append(title, wrapper, field);
    document.body.append(container);
}
createContainer();

//create field for mines
function createField() {
    const field = document.createElement('div');
    field.className = 'field';
    const cellsCount = width * height;
    field.innerHTML = '<button></button>'.repeat(cellsCount);
    return field;
}

//create timer
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
    time = setTimeout(addTime, 1000)
}
let t;
function timer() {
    t = setTimeout(addTime, 1000);
}

timer();
