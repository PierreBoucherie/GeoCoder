// import default from './helper.js';

//Geocoder API variable
const baseUrl ='https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=';
const suffix ='&limit=10&returntruegeometry=false';
//DOM variablle
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const label = document.getElementById('label');
const dlist = document.querySelector('#dlist');
// const hsix = document.getElementById('test');

//Auto completion API variable
const suffixComp = '&type=StreetAddress&maximumResponses=15'
const baseUrlComp = 'https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/completion/?text='
const dpt = ['75','77','78','91','92','93','94','95']
//a&terr=93160%2C97%2C77300&type=StreetAddress&maximumResponses=10

const renderWordResponse = (res) => {
let wordList = [];
  for(item of res.results){
    wordList.push(`<option>${item.fulltext}</option>`);
  }
  wordList = wordList.join("");
  dlist.innerHTML = wordList;
  return;
}


const getCompletionList = () => {
    const dptQy = '&terr='+ dpt.join('%2C')
    const urlComp = baseUrlComp + inputField.value + dptQy + suffixComp;
    try {
        fetch(urlComp).then( (response) => {
            if (response.ok) {
                return response.json().then( (res) => {
                    renderWordResponse(res)
                })
            }
        })
    }
    catch(err) {
        console.log(err.message);
    }
}




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
            label.textContent += lab;
            latitude.textContent += lat;
            longitude.textContent += long;
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
const displayList = (event) => {
    if (inputField.value.length>4){
        getCompletionList();
    }
    if (inputField.value.length<=4) {
        dlist.innerHTML = '';
    }
}

// getCoordinates()
inputField.addEventListener('keypress',displayList)
submit.addEventListener('click',displaySuggestions)
// https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=21%20rue%20carpeaux%20Paris&limit=10&returntruegeometry=false