// import { countryList } from './codes.js';
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) { //to access select tag tag from dropdown
    for (let currCode in countryList) {
        let newOption = document.createElement("option"); //creating options in the select 
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") { //usd as selected
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") { // inr as selected
            newOption.selected = "selected";
        }
        select.append(newOption) //append newoption in select
    }
    select.addEventListener("change", (evt) => { //to update flag 
        updateFlag(evt.target); // passing currency code
    })
}
const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input"); //to fetch Amount from input
    let amtVal = amount.value; //assign amount value

    if (amtVal === "" || amtVal < 1) { //setting 1 if input is empty or negative number
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

const updateFlag = (element) => { // updateFlag function
    let currCode = element.value;
    let countryCode = countryList[currCode]; //assigning countryCode
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //to remove Default behaviour of the page
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})