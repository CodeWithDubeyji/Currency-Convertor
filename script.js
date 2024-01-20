const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchange = document.querySelector(".dropdown i");

// const btn = document.querySelector("form button");


//adding the options of different countries in the dropdown list from the countryList in codes.js.
for(let select of dropdowns) {
    for(currCode in countryList) {

        let newOptions = document.createElement("option");

        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOptions.selected = "selected";
        }
        select.append(newOptions);

        
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let Currcode = element.value;
    let CountryCode = countryList[Currcode];
    let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc ;
};

document.getElementById("btn").addEventListener("click", async(event) => {
    event.preventDefault();//preventing the page to get refreshed/reset as we click on the button.
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {

        amountVal = 1;//when user enters negative num it will automatically calculate for 1.

        amount.value = "1";//when user enters negative num it will automatically show 1.
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amountVal * rate ;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

//when the exchange arrow will be clicked -->
exchange.addEventListener("click", async(evt) => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    let fromCode = fromCurr.value;
    let toCode = toCurr.value;

    //swap
    let temp = fromCode;
    fromCode = toCode;
    toCode = temp;

    //Swapping the flags.
    let fromCountryCode = countryList[fromCode];
    let fromSrc =  `https://flagsapi.com/${fromCountryCode}/flat/64.png`;
    let toCountryCode = countryList[toCode];
    let toSrc =  `https://flagsapi.com/${toCountryCode}/flat/64.png`;
    let fromImg = document.querySelector(".from img");
    fromImg.src = fromSrc;
    let toImg = document.querySelector(".to img");
    toImg.src = toSrc;
    
    // swap the select option.
    document.getElementById("FROM").value = fromCode;
    document.getElementById("TO").value = toCode;

    // Finding the amount after swapping currencies.
    const URL = `${BASE_URL}/${fromCode.toLowerCase()}/${toCode.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCode.toLowerCase()];
    let finalAmount = amountVal * rate ;
    msg.innerText = `${amountVal} ${fromCode} = ${finalAmount} ${toCode}`;

});