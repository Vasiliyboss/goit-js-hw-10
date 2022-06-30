import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 600;
const listCountries = document.querySelector('.country-list');
const infoCountries = document.querySelector('.country-info');
const input = document.querySelector('input#search-box');

input.addEventListener('input', debounce(creatFieldCountries, DEBOUNCE_DELAY));

function creatFieldCountries(e) { 
    e.preventDefult;
    const valueEl = e.target.value.trim();
    fetchCountries(valueEl).then(countries => { 
        if (countries.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
        else if (countries.length > 1 & countries.length <= 10) { 
           listCountries.innerHTML = buildProfileMarkup(countries);
        }
        else  { 
           infoCountries.innerHTML = buildProfileMarkupAll(countries);
        }
     
    })
    .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"))
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`).then(response => {
        if (!response.ok) { 
            throw new Error(response.statusText)
        }
        return response.json();
    },
    );
}


function buildProfileMarkup(countries) { 
    return countries.map(country => `<li class="country-item">
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <p>${country.name.common}</p>
      </li>`).join('');
}
function buildProfileMarkupAll(countries) { 
    return countries.map(country => `<ul class="country-info-list">
        <li class="country-info-item">
          <img src="${country.flags.svg}" alt="${country.name.common}">
        </li>
        <li class="country-info-item">
          <h3 class="info-name">${country.name.common}</h3>
        </li>
        <li class="country-info-item">
          <p class="capital">Capital:${country.capital}</p>
        </li>
        <li class="country-info-item">
          <p class="population">${country.population}</p>
        </li>
        <li class="country-info-item">
          <p class="languages">${country.languages}</p>
        </li>
      </ul>`).join('');
};