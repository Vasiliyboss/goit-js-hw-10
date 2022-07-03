export function buildProfileMarkupAll(countries) { 
  return countries.map(country => `<ul class="country-info-list">
    <li class="country-info-item">
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <h3 class="info-name">${country.name.common}</h3>
        </li>
        <li class="country-info-item">
          <p class="country-info_el">Capital: </p>${country.capital}
        </li>
        <li class="country-info-item">
          <p class="country-info_el">Population:</p>${country.population}
        </li>
        <li class="country-info-item">
          <p class="country-info_el">Languages:</p>${Object.values(country.languages)}
        </li>
      </ul>`).join('');
};