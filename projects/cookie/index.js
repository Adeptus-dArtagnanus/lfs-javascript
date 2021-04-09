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

const getFilterVal = () => filterNameInput.value.trim().toLowerCase();

//======================================================================================
// Обработка ивентов куков

filterNameInput.addEventListener('input', function () {
  drowCookies();
});
addButton.addEventListener('click', () => {
  const title = addNameInput.value;
  const val = addValueInput.value;
  document.cookie = `${title}=${val}`;
  drowCookies();
});
listTable.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.classList.contains('delete-btn')) {
    deleteCookie(btn.dataset.deleteId);
    removeRow(btn.dataset.deleteId);
  }
});
document.addEventListener('DOMContentLoaded', (e) => drowCookies());

//======================================================================================
// Рендеринг элементов

function drowCookies() {
  if (document.cookie === '') return;

  const filterVal = getFilterVal();
  const filter = (el) =>
    el[0].toLowerCase().includes(filterVal) || el[1].toLowerCase().includes(filterVal);

  const rows = getCookiesArr().filter(filter);

  listTable.innerHTML = '';
  listTable.appendChild(createRows(rows));
}
//--------------------------------------------------------------------------------------
function createRows(data) {
  const fragment = document.createDocumentFragment();
  for (const el of data) {
    fragment.appendChild(createRow(el[0], el[1]));
  }
  return fragment;
}
//--------------------------------------------------------------------------------------
function createRow(title, value) {
  const row = document.createElement('tr');
  row.dataset.cookieId = title;
  row.setAttribute('id', `js-cookie-${title}`);

  const titleCell = document.createElement('th');
  titleCell.innerText = title;

  const valueCell = document.createElement('th');
  valueCell.innerText = value;

  const deleteCell = document.createElement('th');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Удалить';
  deleteBtn.dataset.deleteId = title;

  deleteCell.appendChild(deleteBtn);

  row.appendChild(titleCell);
  row.appendChild(valueCell);
  row.appendChild(deleteCell);

  return row;
}

//======================================================================================
// Удаление элементов

function removeRow(title) {
  document.querySelector(`#js-cookie-${title}`).remove();
}

//======================================================================================
// Удаление куков

function deleteCookie(title) {
  const cookieStr = `${title}=;expires=${new Date().toUTCString()}`;
  document.cookie = cookieStr;
}

//======================================================================================
// Выборка и парсинг куков

function getCookiesArr() {
  const cookie = document.cookie;

  if (cookie !== '') {
    return cookie.split('; ').reduce((prev, curr) => {
      prev.push(curr.split('='));
      return prev;
    }, []);
  }

  return null;
}
