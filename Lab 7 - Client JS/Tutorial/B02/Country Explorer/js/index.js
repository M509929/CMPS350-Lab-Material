// declare the base URL
const regionBaseUrl = 'https://restcountries.com/v3.1/region/';
const countryBaseUrl = 'https://restcountries.com/v3.1/name/';

// Get a reference to the elements you want to interact with

const regionDD = document.querySelector('#region');
const countryDD = document.querySelector('#country');
const factsArea = document.querySelector('#facts-area');

// Add events listeners to the different elements

regionDD.addEventListener('change', handleRegionsChange);
countryDD.addEventListener('change', handleCountryChange);


async function handleRegionsChange(e) {
    // step 1 , construct the URL
    const url = `${regionBaseUrl}${regionDD.value}`;
    const response = await fetch(url);
    const countries = await response.json();
    const countryOptions = countries.map(country => `<option value="${country.name.common}">${country.name.official}</option>`);
    countryDD.innerHTML = countryOptions.join(' ');
}


async function handleCountryChange(e) {
    const url = `${countryBaseUrl}${countryDD.value}`;
    const response = await fetch(url);
    const data = await response.json();
    const country = data[0];
    factsArea.innerHTML = convertCountryToHtml(country);
}

function convertCountryToHtml(country) {

    const currencies = Object.values(country.currencies)
        .map(currency => currency.name)
        .join(' - ');
    const languages = Object.values(country.languages).join(' - ');
    return `
        <h1>Facts about ${country.name.common}</h1>
        <img src="${country.flags.png}" alt="${country.flags.alt}" />
        <table>
            <tr>
                <th>Official Country Name</th>
                <td>${country.name.official}</td>
            </tr>
            <tr>
                <th>Capital</th>
                <td>${country.capital}</td>
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