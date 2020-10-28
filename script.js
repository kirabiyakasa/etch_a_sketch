let drawMode = 'normal'

document.getElementById('rainbow-mode').addEventListener('click',
event => {
  drawMode = 'rainbow';
  let title = document.getElementById('title');
  let titleText = title.textContent.split("");
  title.textContent = "";

  titleText.forEach(function(letter) {
  let rainbowLetter = document.createElement('span');
  rainbowLetter.textContent = letter;
  rainbowLetter.style.color = getRandomColor();
  title.appendChild(rainbowLetter);
  });
});

document.getElementById('normal-mode').addEventListener('click',
event => {
  drawMode = 'normal';
  let title = document.getElementById('title');
  title.innerHTML = "";
  title.textContent = 'Etch-a-Sketch';
  });

document.getElementById('choose-grid-size').addEventListener('keypress', 
function chooseGridSize (e) {
  if (e.key === 'Enter') {
    setGridSize()
  }
});

document.getElementById('reset-button').addEventListener('click', event => {
  gridBoxes = document.querySelectorAll('.grid-box')
  gridBoxes.forEach(box => 
  box.style.cssText = ""
  )
});

function setGridSize() {
  let newGridSize = document.getElementById('choose-grid-size')
  if (newGridSize.value > 50) {
    alert('Please set a value of 50 or less.');
    node = document.getElementById('grid-container');
    node.innerHTML = '';
    createGrid(gridSize)
  } else if (newGridSize.value <= 50 && newGridSize.value >= 1) {
    gridSize = newGridSize.value;
    node = document.getElementById('grid-container');
    node.innerHTML = '';
    createGrid(gridSize)
  } else if (newGridSize.value != Number) {
    node = document.getElementById('grid-container');
    node.innerHTML = '';
    createGrid(gridSize)
  }
  document.getElementById('choose-grid-size').value = ''
}
  
function createGrid(gridSize) {
  const grid = document.querySelector('#grid-container');

  function addBoxes() {
    const gridBoxes = document.createElement('div');
    gridBoxes.className = 'grid-box';
    grid.appendChild(gridBoxes);
    }
  for (let i = 0; i < gridSize * gridSize; i++) {
  addBoxes()
  }
  document.getElementById('grid-container').style
  ['grid-template-columns'] = `repeat(${gridSize}, 1fr`;
  document.getElementById('grid-container').style
  ['grid-template-row'] = `repeat(${gridSize}, 1fr)`;

  set_draw_mode()
}
createGrid(30)

function set_draw_mode() {
  document.querySelectorAll('.grid-box').forEach(item => { 
    item.addEventListener('mouseover', event => {
      if (drawMode == 'normal') {
        event.target.style.backgroundColor = 'black';
      } else if (drawMode == 'rainbow') {
        boxOpacity = parseFloat(getComputedStyle(event.target).opacity)
        event.target.style.opacity = boxOpacity - 0.1
        event.target.style.backgroundColor = getRandomColor();
      }
    })
  });
}

function getRandomColor() {
  randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}
