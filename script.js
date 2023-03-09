// import default from './helper.js';
const baseUrl ='https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=';
const adress ='21, rue Carpeaux';
const suffix ='&limit=10&returntruegeometry=false';
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const label = document.getElementById('label');
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const dlist = document.getElementById('dlist');
const hsix = document.getElementById('test');

const baseUrlComp = 'https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/completion/?text='
const dpt = ['75','77','78','91','92','93','94','95']
const text = '7 rue des ec'
const suffixComp = '&type=StreetAddress&maximumResponses=15'
//a&terr=93160%2C97%2C77300&type=StreetAddress&maximumResponses=10
// console.log(dpt.join('%2C'))


const renderWordResponse = (res) => {
    // Creates an array to contain the HTML strings
let wordList = [];
// let wordList2 = [];
  // Loops through the response and maxxing out at 10
  for(item of res.results){
    // Creates a list of words
    // wordList2.push(`<p>${item.fulltext}</p>`);
    wordList.push(`<option>${item.fulltext}</option>`);
  }
  // Joins the array of HTML strings into one string
  wordList = wordList.join("");

  // Manipulates responseField to render the modified response
//   hsix.innerHTML = wordList2;
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
const displayList = (event) => {
    // event.preventDefault();
    
    getCompletionList()
}

// getCoordinates()
inputField.addEventListener('keypress',displayList)
submit.addEventListener('click',displaySuggestions)
// https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=21%20rue%20carpeaux%20Paris&limit=10&returntruegeometry=false