const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(event){
    event.preventDefault();
    successMessage.style.display = 'block';
    form.reset();
    successMessage.style.display = 'block';
})

document.addEventListener('click',function(event){
                          if (!successMessage.contains(event.target) && successMessage.style.display === 'block');
                            successMessage.style.display = 'none'
                                              })

successMessage.addEventListener('click',function(event){
                                event.stopPropagation();
                                })

function searchRecommendation() {
    const input = document.getElementById('RecommendationSearch').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    if (!input) return;

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let found = false;

            for (const country of data.countries) {
                if (country.name.toLowerCase().includes(input)) {
                    resultDiv.innerHTML += `<h2>${country.name}</h2>`;
                    country.cities.forEach(city => {
                        resultDiv.innerHTML += `
                            <div class="result-item">
                                <h3 class="city-name">${city.name}</h3>
                                <img class="city-image" src="${city.imageUrl}" alt="${city.name}" />
                                <p class="city-description">${city.description}</p>
                            </div>`;
                        found = true;
                    });
                } else {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(input)) {
                            resultDiv.innerHTML += `
                                <div class="result-item">
                                    <h3 class="city-name">${city.name}</h3>
                                    <img class="city-image" src="${city.imageUrl}" alt="${city.name}" />
                                    <p class="city-description">${city.description}</p>
                                </div>`;
                            found = true;
                        }
                    });
                }
            }

            if (!found) {
                const temple = data.temples.find(t => t.name.toLowerCase().includes(input));
                if (temple) {
                    resultDiv.innerHTML += `
                        <div class="result-item">
                            <h2 class="city-name">${temple.name}</h2>
                            <img class="city-image" src="${temple.imageUrl}" alt="${temple.name}" />
                            <p class="city-description">${temple.description}</p>
                        </div>`;
                    found = true;
                }
            }

            if (!found) {
                const beach = data.beaches.find(b => b.name.toLowerCase().includes(input));
                if (beach) {
                    resultDiv.innerHTML += `
                        <div class="result-item">
                            <h2 class="city-name">${beach.name}</h2>
                            <img class="city-image" src="${beach.imageUrl}" alt="${beach.name}" />
                            <p class="city-description">${beach.description}</p>
                        </div>`;
                    found = true;
                }
            }

            if (!found) {
                resultDiv.textContent = "No Matching Results Found.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.textContent = "An error occurred while fetching data.";
        });
}

document.getElementById('btnSearch').addEventListener('click', searchRecommendation);

function clearResults() {
    document.getElementById('result').innerHTML = "";
}