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
    const time = document.createElement('time');
    time.className = 'time';
    time.textContent = '00:00:00';
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