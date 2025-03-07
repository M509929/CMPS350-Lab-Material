// Base URLS
// check if the dom is loaded
const REGION_BASE_URL = "https://restcountries.com/v3.1/region/";
const COUNTRY_BASE_URL = "https://restcountries.com/v3.1/name/";

// get the references that you want to work with
const regionDD = document.querySelector("#region");
const countryDD = document.querySelector("#country");
const factsArea = document.querySelector("#facts-area");
const mainContent = document.querySelector("#main-content");

// Listen to events on the region dropdown
regionDD.addEventListener("change", handleRegionChange);
countryDD.addEventListener("change", handleCountryChange);

// write the function to handle the region change event

async function handleRegionChange(e) {
  const url = `${REGION_BASE_URL}${regionDD.value}`;
  const response = await fetch(url);
  const data = await response.json();
  const countryOptions = data
    .map(country => `<option value="${country.name.common}">${country.name.official}</option>`);

  countryDD.innerHTML = countryOptions.join(' ');
}


async function handleCountryChange() {
  const url = `${COUNTRY_BASE_URL}${countryDD.value}`;
  const response = await fetch(url);
  const data = await response.json();
  const country = data[0];
  factsArea.innerHTML = convertCountryToHtml(country);
}

function convertCountryToHtml(country) {
  const currencies = Object.values(country.currencies)
    .map(currency => currency.name).join(', ');
  return `
       <h1>${country.name.official}</h1>
       <img src="${country.flags.png}" alt="${country.flags.alt}" /> 

       <table>
              <tr>
                <th>Capital</td>
                <td>${country.capital}</td>
              </tr>
              <tr>
                <th>Area</td>
                <td>${country.area} km<sup>2</sup></td>
              </tr>
              <tr>
                <th>Population</td>
                <td>${country.population}</td>
              </tr>
              <tr>
                <th>Languages</td>
                <td>${Object.values(country.languages).join(', ')}</td>
              </tr>
              <tr>
                <th>Currencies</td>
                <td>${currencies}</td>
              </tr>
       </table>
    `
}