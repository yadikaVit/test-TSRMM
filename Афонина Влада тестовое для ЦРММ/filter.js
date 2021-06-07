let users = [
  { id: 1, name: "Денис", secondName: "Топорков", age: 30, rating: 115, position: 'Руководитель' },
  { id: 2, name: "Лукьян", secondName: "Рагозин", age: 22, rating: 22 },
  { id: 3, name: "Ярослав", secondName: "Рыжов", age: 45, rating: 10, position: 'Менеджер' },
  { id: 4, name: "Денис", secondName: "Топорков", age: 55, rating: 102 },
  { id: 5, name: "Артем", secondName: "Кашников", age: 22, rating: 97 },
  { id: 6, name: "Лада", secondName: "Боярская", age: 25, rating: 15 },
  { id: 7, name: "Иосиф", secondName: "Южанин", age: 41, rating: 0, position: 'Ассистент' },
  { id: 8, name: "Станислав", secondName: "Качаев", age: 34, rating: 0, position: 'Ассистент' },
  { id: 9, name: "Эдуард", secondName: "Бузинский", age: 32, rating: 200, position: 'Руководитель' }
]

const userListElement = document.querySelector('.users-list');

const userListFragment = document.createDocumentFragment();

const userTemplate = document.querySelector('#user-template')
  .content
  .querySelector('.user-item');

const avatarSecondName = document.querySelector('.avatar-second-name');
const avatarName = document.querySelector('.avatar-name');

const INCLINATIONS = ['балл', 'балла', 'баллов'];

const chooseInclinations = (num) => {
  var result;
  count = num % 100;
  if (count >= 5 && count <= 20) {
    result = INCLINATIONS['2'];
  } else {
    count = count % 10;
    if (count == 1) {
      result = INCLINATIONS['0'];
    } else if (count >= 2 && count <= 4) {
      result = INCLINATIONS['1'];
    } else {
      result = INCLINATIONS['2'];
    }
  }
  return result;
}

const renderUserList = (array) => {
  const userListFragment = document.createDocumentFragment();

  array.forEach(({ id, name, secondName, rating, position, age }) => {
    const userElement = userTemplate.cloneNode(true);
    userElement.querySelector('.number').textContent = id;
    userElement.querySelector('.user-name').textContent = name + ',';
    userElement.querySelector('.second-name').textContent = secondName;
    userElement.querySelector('.user-age').textContent = age;
    userElement.querySelector('.scores').textContent = rating;
    userElement.querySelector('.position').textContent = position;
    userElement.querySelector('.avatar-name').textContent = secondName.charAt(0).toUpperCase() +
      name.charAt(0).toUpperCase();
    userElement.querySelector('.scores-text').textContent = chooseInclinations(rating.toString().slice(-1));
    userListFragment.appendChild(userElement);
  });

  userListElement.appendChild(userListFragment);
  return userListElement
};

const clearUserList = () => {
  userListElement.innerHTML = '';
};

// Сортировка

const toChangeId = (array) => {
  array.map((item, index) => item.id = index + 1);
};

const showSortableList = (array) => {
  clearUserList();
  toChangeId(array);
  renderUserList(array);
}

const toSortUsers = () => {

  const buttonSortingByAgeUp = document.querySelector('.age-button-up');
  const buttonSortingByAgeDown = document.querySelector('.age-button-down');
  const buttonSortingByRatingUp = document.querySelector('.rating-button-up');
  const buttonSortingByRatingDown = document.querySelector('.rating-button-down');
  const sortingArrayUsers = users.slice(0);

  buttonSortingByAgeUp.addEventListener('click', function () {
    sortingArrayUsers.sort((a, b) => a.age - b.age);
    showSortableList(sortingArrayUsers);
  });

  buttonSortingByAgeDown.addEventListener('click', function () {
    sortingArrayUsers.sort((a, b) => b.age - a.age);
    showSortableList(sortingArrayUsers);
  });

  buttonSortingByRatingUp.addEventListener('click', function () {
    sortingArrayUsers.sort((a, b) => a.rating - b.rating);
    showSortableList(sortingArrayUsers);
  });

  buttonSortingByRatingDown.addEventListener('click', function () {
    sortingArrayUsers.sort((a, b) => b.rating - a.rating);
    showSortableList(sortingArrayUsers);
  });
};

// Поиск

const filterbyName = (input) => {
  return users.filter(item => {
    return item.name.toLowerCase().indexOf(input.toLowerCase()) > -1;
  });
};

const filterbySecondName = (input) => {
  return users.filter(item => {
    return item.secondName.toLowerCase().indexOf(input.toLowerCase()) > -1;
  });
}
const inputName = document.querySelector('#name');
const inputSecondName = document.querySelector('#second-name');

const toFilterUsers = () => {

  const buttonSearchSecondName = document.querySelector('.second-name-button');
  const buttonSearchName = document.querySelector('.name-button');

  buttonSearchSecondName.addEventListener('click', function () {
    clearUserList();
    showSortableList(filterbySecondName(inputSecondName.value));
  })
  inputSecondName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      clearUserList();
      showSortableList(filterbySecondName(inputSecondName.value));
    }
  });

  buttonSearchName.addEventListener('click', function () {
    clearUserList();
    showSortableList(filterbyName(inputName.value));
  })
  inputName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      clearUserList();
      showSortableList(filterbyName(inputName.value));
    }
  });
};

const clickResetButton = () => {
  const resetButton = document.querySelector('.reset-button');

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    clearUserList();
    renderUserList(users);
    inputSecondName.value = '';
    inputName.value = '';

  })
};

document.addEventListener('DOMContentLoaded', () => {
  renderUserList(users);
  toSortUsers();
  toFilterUsers();
  clickResetButton();
});

