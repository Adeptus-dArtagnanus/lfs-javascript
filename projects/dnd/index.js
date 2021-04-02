/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

let currDragable = null;

const homeworkContainer = document.querySelector('#app');

const randomInt = (num) => Math.round(Math.random() * num);

document.addEventListener('mousemove', (e) => {
  if (currDragable) {
    currDragable.target.style.left = `${e.clientX - currDragable.offsetX}px`;
    currDragable.target.style.top = `${e.clientY - currDragable.offsetY}px`;
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'DIV') {
    currDragable = {
      target: e.target,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    };
  }
});

document.addEventListener('mouseup', (e) => {
  if (currDragable) {
    currDragable = null;
  }
});

export function createDiv() {
  const element = document.createElement('div');
  element.classList.add('draggable-div');

  const color = `rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`;
  console.log(color);

  element.style.height = `${randomInt(300)}px`;
  element.style.width = `${randomInt(300)}px`;
  element.style.left = `${randomInt(window.innerWidth)}px`;
  element.style.top = `${randomInt(window.innerHeight)}px`;
  element.style.backgroundColor = color;

  console.log(element.style.backgroundColor);
  return element;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
