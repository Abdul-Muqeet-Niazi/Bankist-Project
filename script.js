"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Function of Intl Number Format !!

const currencyFormat = function (movementz, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(movementz);
};

// Display and add movements to accounts;
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  // To remove previous deposit and withdrawal texts in movement container of HTML ↑!

  // To Sort movements ↓
  const move = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // To create movements ↓
  move.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // To Implement Dates
    const Dates = new Date(acc.movementsDates[i]);
    const day = `${Dates.getDate()}`.padStart(2, 0);
    const month = `${Dates.getMonth() + 1}`.padStart(2, 0);
    const year = Dates.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    // To Implement IntlNumbers:
    const movementNumFormat = currencyFormat(mov, acc.locale, acc.currency);

    const HTML = `
        <div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } deposit</div>
         <div class="movements__date">${displayDate}</div>
         <div class="movements__value">${movementNumFormat}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", HTML);
  });
};
// We are calling the function in login feature ↓;

// Now we are making userinput functionality:
const createUserName = function (accs) {
  accs.map(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
  return accs;
};
createUserName(accounts);

// Now collecting the total amount of account.movement and display it:
const displayAmount = function (account) {
  account.accountBalance = account.movements.reduce(
    (acc, amount) => acc + amount,
    0
  );
  // Create the accountBalnce variable in account and store the balance in it ↑ !
  // labelBalance.textContent = account.accountBalance + "€";  // ←← Previous Version Manually Made

  // To Implement accountBalance through API:
  labelBalance.textContent = currencyFormat(
    account.accountBalance,
    account.locale,
    account.currency
  );
};
// We are calling the function in login feature ↓;

// Now we collecting deposit money, withdrawal money, interest money in the summary;
const moneySummary = function (acc) {
  const depositMoney = acc.movements
    .map((money) => money)
    .filter((money) => money > 0)
    .reduce((acc, money) => acc + money, 0);
  // labelSumIn.textContent = `${depositMoney}€`;  // ←← Previous Version Manually Made
  labelSumIn.textContent = currencyFormat(
    depositMoney,
    acc.locale,
    acc.currency
  );

  const withdrawalMoney = acc.movements
    .map((money) => money)
    .filter((money) => money < 0)
    .reduce((acc, money) => acc + money, 0);
  // labelSumOut.textContent = `${Math.abs(withdrawalMoney)}€`; // ←← Previous Version Manually Made
  labelSumOut.textContent = currencyFormat(
    Math.abs(withdrawalMoney),
    acc.locale,
    acc.currency
  );

  const interestMoney = acc.movements
    .filter((interest) => interest > 0)
    .map((money) => (money * acc.interestRate) / 100)
    .filter((money) => money >= 1)
    .reduce((acc, money) => acc + money, 0);
  // labelSumInterest.textContent = `${Math.abs(interestMoney).toFixed(2)}€`;  // ←← Previous Version Manually Made
  labelSumInterest.textContent = currencyFormat(
    Math.abs(interestMoney),
    acc.locale,
    acc.currency
  );
};
// We are calling this function in login feature ↓

// Implementing login and pin strategies/feature on all accounts;
let currentUser;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting because in form of HTML feature on click it is submitted and refresh the page!
  e.preventDefault();

  // Stabilize the login field
  currentUser = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentUser);

  // Stabilize the Pin field
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // Display UI messsage;
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input field;
    inputLoginUsername.value = inputLoginPin.value = "";

    // Clear the focus of field;
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Implementing Date Manually;
    const present = new Date();
    // const day = `${present.getDate()}`.padStart(2, 0);
    // const month = `${present.getMonth() + 1}`.padStart(2, 0);
    // const year = present.getFullYear();
    // const hour = `${present.getHours()}`.padStart(2, 0);
    // const min = `${present.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Implenting Dates With API (Intl)
    const option = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      minute: "numeric",
      hour: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentUser.locale,
      option
    ).format(present);

    // Display Movements;
    displayMovements(currentUser);

    // Display Balance;
    displayAmount(currentUser);

    // Display Money Summary;
    moneySummary(currentUser);

    // Calling the timer function in Login functionality;
    // Order to clear previous timer functionality which makes trouble in multiple accounts holder!
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// Implementing Timer Function Logic
const startLogoutTimer = function () {
  // We made this separate function because In result it creates problem of starting the count from 1 and then goes backward from 2min and Now it will directly execute and call function in setInterval.
  const trick = function () {
    // Formula for change the time into minute and second
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // Stop the timer when it reaches to zero 0;
    if (time == 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }

    // We write it at last bcz it showing the result as 1 in UI and while running in program it is 0 and therefore customer have not satisfaction!
    // Decrease the time every second:
    time--;
  };

  // Set the time
  let time = 300;

  // Calling the trick
  trick();
  // Call the timer every second
  const timer = setInterval(trick, 1000);
  return timer;
};

// For having trouble in time when multiple user login in accounts so it having two times showing the time while one is currently account timer and other is the previous account timer!
// So in this case we will make a globally variable:
let timer; // In order to make globally variable we have to first return the variable ↖↖!

// Now we making the functionality of Transfer Money, Add money in other account, Remove money in own account!
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  // Clear input field;
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    recieverAccount &&
    currentUser.accountBalance >= amount &&
    recieverAccount?.username !== currentUser.username
  ) {
    // Doing the transfer!
    currentUser.movements.push(-amount);
    recieverAccount.movements.push(amount);

    // Add Transfer Date
    currentUser.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    // Update UI;
    // Display Movements;
    displayMovements(currentUser);

    // Display Balance;
    displayAmount(currentUser);

    // Display Money Summary;
    moneySummary(currentUser);

    // Restart the timer on transfer functionality
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// Now we making the functionality of deleting the account!
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // Delete the account
  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentUser.username
    ); // find the index which the statement is true!
    accounts.splice(index, 1);

    // Now hide the UI interface
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.trunc(Math.floor(inputLoanAmount.value));

  if (amount > 0 && currentUser.movements.some((mov) => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentUser.movements.push(amount);

      // Adding Date of Loan
      currentUser.movementsDates.push(new Date().toISOString());

      // Update UI;
      // Display Movements;
      displayMovements(currentUser);

      // Display Balance;
      displayAmount(currentUser);

      // Display Money Summary;
      moneySummary(currentUser);

      // Restart the timer on transfer functionality
      if (timer) clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }

  inputLoanAmount.value = "";
});

// To establish sort functionality
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sorted);
  // We use this ↓↓ for again clicking on button to achieve normal position
  sorted = !sorted;
});
