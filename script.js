const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

console.log(data);

// Fetch random user and add values
// let getRandomUser = () => {
//   fetch('https://randomuser.me/api')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     });
// };

// Using async await rather than then
let getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
  //   console.log(newUser);
};
getRandomUser();
getRandomUser();
getRandomUser();

// Double everyones money
let doubleMoney = () => {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });
  updateDom();
};

// Sort by richest
let sortByRichest = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDom();
};

// Filter out only the millionaires
let showMillionAires = () => {
  data = data.filter(rich => {
    if (rich.money > 1000000) {
      return rich;
    }
  });
  updateDom();
};

// Calculate the total wealth

let totalWealth = () => {
  const wealth = data.reduce((acc, user) => {
    return acc + user.money;
  }, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</h3></strong> `;
  main.appendChild(wealthEl);
};

// Add new user to the array
let addData = obj => {
  data.push(obj);
  updateDom();
};

// Update dom
let updateDom = (providedData = data) => {
  // Clear the main Div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(person => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
};

// Format number to money
let formatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionAires);
calculateWealthBtn.addEventListener('click', totalWealth);
