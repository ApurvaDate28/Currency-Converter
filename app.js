const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const BASE_URL =
//   "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// swtich
const toggleSwitch = document.getElementById('dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
//   let URL = `${BASE_URL}from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}%2CGBP`;

  let response = await fetch(URL);
//   let data = await response;

  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal}  ${fromCurr.value} = ${finalAmount}  ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// toggle switch
document.addEventListener('DOMContentLoaded', () => {
  if (currentTheme) {
      document.body.classList.add(currentTheme);
      if (currentTheme === 'dark-mode') {
          toggleSwitch.checked = true;
      }
  } else {
    document.body.classList.add('light-mode');
  }

  toggleSwitch.addEventListener('change', () => {
      if (toggleSwitch.checked) {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
          localStorage.setItem('theme', 'dark-mode');
      } else {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light-mode');
      }
  });
});


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});