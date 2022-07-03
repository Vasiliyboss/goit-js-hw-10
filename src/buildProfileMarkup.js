export function buildProfileMarkup(countries) { 
    return countries.map(country => `<li class="country-item">
        <img clas ="image" src="${country.flags.svg}" alt="${country.name.common}">
        <h3>${country.name.common}</h3>
      </li>`).join('');
}