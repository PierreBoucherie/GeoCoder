// import default from './helper.js';
const baseUrl ='https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=';
// const adress ='21, rue Carpeaux,Paris';
const suffix ='&limit=10&returntruegeometry=false';
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const label = document.getElementById('label');
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');


const formatAdress = (adress) => {
    return adress.replaceAll(" ",'%');
}

const getCoordinates = () => {
    const adress = inputField.value;
    console.log(adress)
    const url = baseUrl + formatAdress(adress) + suffix;
    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request Failed')
    },  networkError => {
        console.log(networkError.message)
        })
        .then(jsonResponse=>{
            const lat = jsonResponse.features[0].geometry.coordinates[1].toString().replace('.',",");
            const long = jsonResponse.features[0].geometry.coordinates[0].toString().replace('.',",");
            const lab = jsonResponse.features[0].properties.label;
            // console.log(jsonResponse.features[0]);
            // extractData(jsonResponse)

            label.textContent += lab;
            latitude.textContent += lat;
            longitude.textContent += long;
            console.log(lat);
            console.log(jsonResponse.features[0].geometry.coordinates);
            console.log(jsonResponse.features[0].properties.label);
            // console.log(jsonResponse.features[1].properties.label);
        })
}

// Clears previous results and display results to webpage
const displaySuggestions = (event) => {
    event.preventDefault();
    latitude.innerHTML = '';
    longitude.innerHTML = '';
    label.innerHTML = '';
    getCoordinates()
}

// getCoordinates()
submit.addEventListener('click',displaySuggestions)
// https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=21%20rue%20carpeaux%20Paris&limit=10&returntruegeometry=false