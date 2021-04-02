/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
  drowCookies();
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  drowCookies();
});

listTable.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete-btn')){
    let row = e.target.parentNode.parentNode;
    let cookieStr = `${row.firstElementChild.innerText}=;expires=${new Date().toUTCString()}`;

    document.cookie = cookieStr;
    drowCookies();
  }
});


function drowCookies(){
  let filter = filterNameInput.value.trim().toLowerCase()
  let rows = getCookiesArr() && getCookiesArr().filter( el => el[0].toLowerCase().includes(filter) || el[1].toLowerCase().includes(filter) )

  listTable.innerHTML = '';
  if(rows){
    drowRows(rows);
  }
}

function drowRows(data){
  for(let el of data){
    listTable.appendChild( createRow(el[0],el[1]) )
  }
}

document.addEventListener('DOMContentLoaded', e=>drowCookies());


function createRow(title, value){
  let row = document.createElement('tr');
  
  let titleCell = document.createElement('th');
  titleCell.innerText = title;

  let valueCell = document.createElement('th');
  valueCell.innerText = value;

  let deleteCell = document.createElement('th');
  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Удалить';

  deleteCell.appendChild(deleteBtn);

  row.appendChild(titleCell);
  row.appendChild(valueCell);
  row.appendChild(deleteCell);

  return row;
}


function getCookiesObj(){
  let cookie = document.cookie;

  if(cookie !== ''){
    return cookie.split('; ').reduce((prev, curr)=>{
      let [title, value] = curr.split('=')
      prev[title] = value;
      return prev;
    }, {})
  }

  return null  
}
function getCookiesArr(){
  let cookie = document.cookie;

  if(cookie !== ''){
    return cookie.split('; ').reduce((prev, curr)=>{
      prev.push(curr.split('='))
      return prev;
    }, [])
  }

  return null  
}