import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { buildProfileMarkup } from './buildProfileMarkup';
import { buildProfileMarkupAll } from './buildProfileMarkupAll';
const DEBOUNCE_DELAY = 600;
const listCountries = document.querySelector('.country-list');
const infoCountries = document.querySelector('.country-info');
const input = document.querySelector('input#search-box');

input.addEventListener('input', debounce(creatFieldCountries, DEBOUNCE_DELAY));

function creatFieldCountries(e) { 
    
  infoCountries.innerHTML = '';
  listCountries.innerHTML = '';

    const valueEl = e.target.value.trim();
  fetchCountries(valueEl).then(countries => {
    if (countries.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (countries.length > 1 & countries.length <= 10) {
      infoCountries.innerHTML = '';
      listCountries.innerHTML = buildProfileMarkup(countries);
    }
    else {
      listCountries.innerHTML = '';
      infoCountries.innerHTML = buildProfileMarkupAll(countries);
    }
  })
    .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"))
}

