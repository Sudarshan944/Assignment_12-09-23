const countryInfo = document.querySelector(".load");
const countryInput = document.querySelector(".cntry-name");
const searchButton = document.querySelector("button");

const fetchCountryInfo = async (countryName) => {
  try {
    if (!countryName) {
      countryInfo.innerHTML = "Please enter a valid country name.";
      return;
    }

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();

    if (data.length === 0) {
      countryInfo.innerHTML = "Country not found.";
      return;
    }

    const currencies = data[0].currencies;
    const currencyNames = Object.keys(currencies);
    const currencySymbols = currencyNames.map(
      (currency) => currencies[currency].symbol
    );
    const currencyList = currencyNames.map((currency, index) => {
      return `
        <p><strong>Currency:</strong> ${currency} (${currencySymbols[index]})</p>
      `;
    });

    const { name, capital, population, region } = data[0];
    const countryCard = `
      <div class="country-card">
        <img src=${data[0].flags.png} alt="${data[0].flags.alt}" />
        <h2>${name.common}</h2>
        <p><strong>Capital:</strong> ${capital}</p>
         ${currencyList}
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${region}</p>
      </div>
    `;

    countryInfo.innerHTML = countryCard;
  } catch (error) {
    console.error(error);
    countryInfo.innerHTML = "Failed to fetch country information.";
  }
};

searchButton.addEventListener("click", () => {
  const countryName = countryInput.value.trim();

  countryInfo.innerHTML = "<p>Loading...</p>";

  fetchCountryInfo(countryName);
});

fetchCountryInfo("");
