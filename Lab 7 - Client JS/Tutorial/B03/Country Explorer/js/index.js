// step 1 : is to check if the index.js file is connected to the html file
// console.log("it is working");

// // dom loaded
const regionBaseURL = "https://restcountries.com/v3.1/region/";
const countryBaseURL = "https://restcountries.com/v3.1/name/";

// step 2. get the reference of the DOM elements you will be interacting with

const regionDD = document.querySelector("#region");
const countryDD = document.querySelector("#country");
const factsArea = document.querySelector("#facts-area");

//  step 3 is to add the event listener to the DOM element
regionDD.addEventListener('change', handleRegionChange);
countryDD.addEventListener('change', handleCountryChange);

// step 4 is to define the callback function
async function handleRegionChange(e) {
    let countries = []
    if (localStorage[e.target.value]) {
        countries = JSON.parse(localStorage.countries);
        console.log('from local storage');

    } else {
        const url = `${regionBaseURL}${e.target.value}`;
        const response = await fetch(url);
        countries = await response.json();
        localStorage[e.target.value] = JSON.stringify(countries);
        console.log('from API');

    }
    const countriesOptions = countries
        .map(country => `<option value="${country.name.common}">${country.name.common}</option>`)
        .join(' ')

    countryDD.innerHTML = countriesOptions;

}
async function handleCountryChange(e) {
    const url = `${countryBaseURL}${e.target.value}`;
    const response = await fetch(url);
    const data = await response.json();
    const country = data[0];

    factsArea.innerHTML = convertCountryToHTML(country);


}

// helper method
function convertCountryToHTML(country) {
    const currencies = Object.values(country.currencies)
        .map(currency => currency.name).join(', ');

    const languages = Object.values(country.languages).join(', ');

    return `
        <h1>${country.name.common}</h1>
        <img src="${country.flags.png}" alt="${country.flags.alt}" class="flag-img">
        <table>
            <tr>
                <th>Official Country Name</th>
                <td>${country.name.official}</td>
            </tr>
            <tr>
                <th>Population</th>
                <td>${country.population}</td>
            </tr>
            <tr>
                <th>Currencies</th>
                <td>${currencies}</td>
            </tr>
            <tr>
                <th>Languages</th>
                <td>${languages}</td>
            </tr>
        </table>
    `
}